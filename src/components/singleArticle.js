import React from 'react';
import { getArticleById, getAllArticles } from './api';
import SingleArticleRender from './singleArticleRender';
import Loading from './loading';

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
            showComments={this.showComments}
            article={article}
          />
          <div className='commentsContainer'>comments</div>
        </>
      );
    }
  }
}
export default SingleArticle;
