import React from 'react';
import Loading from './loading';
import { getCommentsById, removeComment } from './api';
import CommentCard from './commentCard';
import AddComment from './addComment';
import CommentsFilters from './commentsFilters';

class CommentsList extends React.Component {
  state = {
    isLoading: true,
    comments: [],
    addComment: false,
    username: '',
    commentAdded: false,
    params: { limit: 100, sort_by: 'created_at', order: 'desc' },
  };

  async componentDidMount() {
    const comments = await getCommentsById(this.props.article_id);

    this.setState({
      comments,
      isLoading: false,
      username: this.props.username,
    });
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.commentAdded !== this.props.commentAdded) {
      const comments = await getCommentsById(this.props.article_id);

      this.setState({ comments, isLoading: false });
    }
  }
  toggleAddComment = (event) => {
    this.setState({ addComment: !this.state.addComment });
  };
  commentAdded = (newComment) => {
    const comments = this.state.comments;
    comments.unshift(newComment);

    this.props.changeCount(0.5);
    this.setState({
      commentAdded: !this.state.commentAdded,
      comments: comments,
    });
  };

  deleteComment = async (comment_id) => {
    const deleteConfirmed = await removeComment(comment_id);
    console.log(deleteConfirmed);
    const comments = await getCommentsById(this.props.article_id);

    if (deleteConfirmed === 204) {
      this.props.changeCount(-0.5);
      this.setState({ comments });
    }
  };

  changeHandler = (event) => {
    this.setState((currentState) => {
      const newState = {
        params: {
          ...currentState.params,
          [event.target.name]: event.target.value,
        },
      };
      return newState;
    });
  };

  submitFilters = async (event) => {
    console.log(this.state, 'STATE IN COMMENTS');
    event.preventDefault();
    const comments = await getCommentsById(
      this.props.article_id,
      this.state.params
    );
    this.setState({
      comments: comments,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <>
          <button className='addCommentButton' onClick={this.toggleAddComment}>
            {this.state.addComment ? 'Hide Add Comment' : 'Add Comment'}
          </button>
          {this.state.addComment && (
            <AddComment
              article_id={this.props.article_id}
              username={this.state.username}
              commentAdded={this.commentAdded}
            />
          )}
          <CommentsFilters
            changeHandler={this.changeHandler}
            submitFilters={this.submitFilters}
          />

          <ul className='commentsList'>
            {this.state.comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  data={comment}
                  username={this.state.username}
                  deleteComment={this.deleteComment}
                />
              );
            })}
          </ul>
        </>
      );
    }
  }
}

export default CommentsList;
