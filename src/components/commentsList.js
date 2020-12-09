import React from 'react';
import Loading from './loading';
import { getCommentsById } from './api';
import CommentCard from './commentCard';

class CommentsList extends React.Component {
  state = {
    isLoading: true,
    comments: [],
  };

  async componentDidMount() {
    const comments = await getCommentsById(this.props.article_id);

    this.setState({ comments, isLoading: false });
  }
  render() {
    console.log(this.state.comments, 'STATE IN COMMENTSLIST');
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <ul className='commentsList'>
          {this.state.comments.map((comment) => {
            return <CommentCard key={comment.comment_id} data={comment} />;
          })}
        </ul>
      );
    }
  }
}

export default CommentsList;
