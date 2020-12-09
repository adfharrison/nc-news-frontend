import React from 'react';
const SingleArticleRender = (props) => {
  // componentDidMount() {
  //   this.setState({ showComments: this.props.toggleComments });
  // }

  const article = props.article;

  return (
    <div className='singleArticleContainer'>
      <li className='singleArticle'>
        <h4 className='singleArticleTitle'>{article.title}</h4>
        <h4 className='singleArticleAuthor'>Author: {article.author}</h4>

        <p className='singleArticleBody'> {article.body}...</p>
        <p className='singleArticleVotes'>Votes: {article.votes}</p>
        <p className='singleArticleComments'>
          Comments: {article.comment_count}
        </p>

        <button className='showCommentsButton' onClick={props.showComments}>
          Show comments
        </button>
      </li>
    </div>
  );
};

export default SingleArticleRender;
