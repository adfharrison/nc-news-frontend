import React from 'react';
import { getArticleById, getAllArticles } from './api';
import SingleArticleRender from './singleArticleRender';
import Loading from './loading';
import CommentsList from './commentsList';

class SingleArticle extends React.Component {
  state = {
    article: {},
    showComments: false,
    isLoading: true,
  };

  async componentDidMount() {
    const article = await getArticleById(this.props.article_id);

    this.setState({ article, isLoading: false });
  }

  showComments = (event) => {
    this.setState({ showComments: true });
  };

  hideComments = (event) => {
    this.setState({ showComments: false });
  };
  render() {
    console.log(this.state, 'STATE IN SINGLE ARTICLE');
    const article = this.state.article;
    if (this.state.isLoading) {
      return <Loading />;
    } else if (!this.state.showComments) {
      return (
        <SingleArticleRender
          showComments={this.showComments}
          article={article}
        />
      );
    } else {
      return (
        <>
          <SingleArticleRender
            toggleComments={this.state.showComments}
            showComments={this.showComments}
            hideComments={this.hideComments}
            article={article}
          />
          <div className='commentsContainer'>
            <CommentsList article_id={article.article_id} />
          </div>
        </>
      );
    }
  }
}
export default SingleArticle;
