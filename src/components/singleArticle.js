import React from 'react';
import { getArticleById, getAllArticles, changeArticleVotes } from './api';
import SingleArticleRender from './singleArticleRender';
import Loading from './loading';
import CommentsList from './commentsList';
import AddComment from './addComment';

class SingleArticle extends React.Component {
  state = {
    article: {},
    showComments: false,
    isLoading: true,
    addComment: false,
    username: '',
    commentAdded: false,
    hasError: false,
    errorMessage: '',
  };

  async componentDidMount() {
    try {
      const article = await getArticleById(this.props.article_id);

      this.setState({
        article,
        isLoading: false,
        username: this.props.username,
      });
    } catch (error) {
      const {
        response: { status, statusText },
      } = error;
      this.setState({
        hasError: true,
        errorMessage: `${status}: ${statusText}`,
      });
    }
  }

  toggleComments = (event) => {
    this.setState({ showComments: !this.state.showComments });
  };
  changeCount = (num) => {
    this.setState((currentState) => {
      let newState = currentState;
      newState.article.comment_count = this.state.article.comment_count + num;
      return newState;
    });
  };
  upVote = async (num) => {
    let request = {
      inc_votes: 1,
    };
    const voteChangeSuccess = await changeArticleVotes(
      this.state.article.article_id,
      request
    );

    this.setState((currentState) => {
      let newState = currentState;
      newState.article.votes = this.state.article.votes + 0.5;

      return newState;
    });
  };

  downVote = async (num) => {
    let request = {
      inc_votes: -1,
    };
    const voteChangeSuccess = await changeArticleVotes(
      this.state.article.article_id,
      request
    );

    this.setState((currentState) => {
      let newState = currentState;
      newState.article.votes = this.state.article.votes - 0.5;

      return newState;
    });
  };
  render() {
    console.log(`${this.state.hasError}, ${this.state.errorMessage}`);
    const article = this.state.article;
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <>
          <SingleArticleRender
            showComments={this.state.showComments}
            addComment={this.state.addComment}
            toggleComments={this.toggleComments}
            toggleAddComment={this.toggleAddComment}
            article={article}
            upVote={this.upVote}
            downVote={this.downVote}
          />

          {this.state.showComments && (
            <div className='commentsContainer'>
              <CommentsList
                article_id={article.article_id}
                commentAdded={this.state.commentAdded}
                username={this.state.username}
                changeCount={this.changeCount}
              />
            </div>
          )}
        </>
      );
    }
  }
}
export default SingleArticle;
