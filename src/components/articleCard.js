import { Link } from '@reach/router';
import React from 'react';
import UserAvatar from './userAvatar';

class ArticleCard extends React.Component {
  state = {
    author: '',
    showWarning: false,
  };

  componentDidMount() {
    this.setState({ username: this.props.data.author });
  }

  validateDelete = () => {
    console.log('USERNAME INVALID');

    if (this.state.username === this.props.username) {
      console.log('USERNAME VALIDATED');
      this.props.deleteArticle(this.props.data.article_id);
    } else {
      this.setState({ showWarning: true });
    }
  };

  render() {
    return (
      <li className='articleCard'>
        <h4 className='cardTitle'>Title: {this.props.data.title}</h4>
        <div className='articleAuthor'>
          <h4 className='articleAuthorName'>
            Author: {this.props.data.author}
          </h4>
          <UserAvatar author={this.props.data.author} />
        </div>

        <p className='cardBody'> {this.props.data.body.slice(0, 120)}...</p>
        <p className='cardVotes'>Votes: {this.props.data.votes}</p>
        <p className='cardComments'>
          Comments: {this.props.data.comment_count}
        </p>

        <Link
          to={`/articles/${this.props.data.article_id}`}
          username={this.props.username}
          rerenderList={this.props.rerenderList}
        >
          <button className='cardButton'>Click to see article </button>
        </Link>
        <button className='deleteArticleButton' onClick={this.validateDelete}>
          Delete Article
        </button>
        {this.state.showWarning && <h5>Only the author can do this</h5>}
      </li>
    );
  }
}

export default ArticleCard;
