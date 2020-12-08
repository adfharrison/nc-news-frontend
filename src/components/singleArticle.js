import React from 'react';
import { getArticleById, getAllArticles } from './api';

class SingleArticle extends React.Component {
  state = {
    article: {},
  };

  async componentDidMount() {
    const article = await getArticleById(this.props.article_id);

    this.setState({ article });
  }

  render() {
    console.log(this.state, 'STATE IN SINGLE ARTICLE');
    const article = this.state.article;
    return (
      <div className='singleArticleContainer'>
        <li className='singleArticle'>
          <h4 className='singleArticleTitle'>{article.title}</h4>
          <h4 className='singleArticleAuthor'>Author: {article.author}</h4>

          <p className='singleArticleBody'> {article.body}...</p>
          <p className='singleArticleVotes'>Votes: {article.votes}</p>
        </li>
      </div>
    );
  }
}
export default SingleArticle;
