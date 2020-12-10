import React from 'react';
import { changeCommentVotes } from './api';
import UserAvatar from './userAvatar';

class CommentCard extends React.Component {
  state = {
    author: '',
    showWarning: false,
    votes: 0,
  };

  componentDidMount() {
    this.setState({
      author: this.props.data.author,
      votes: this.props.data.votes,
    });
  }

  validateDelete = () => {
    console.log('USERNAME INVALID');

    if (this.state.author === this.props.username) {
      console.log('USERNAME VALIDATED');
      this.props.deleteComment(this.props.data.comment_id);
    } else {
      this.setState({ showWarning: true });
    }
  };
  upVote = async (num) => {
    let request = {
      inc_votes: 1,
    };
    const voteChangeSuccess = await changeCommentVotes(
      this.props.data.comment_id,
      request
    );

    this.setState((currentState) => {
      let newState = currentState;
      newState.votes = this.state.votes + 0.5;

      return newState;
    });
  };

  downVote = async (num) => {
    let request = {
      inc_votes: -1,
    };
    const voteChangeSuccess = await changeCommentVotes(
      this.props.data.comment_id,
      request
    );

    this.setState((currentState) => {
      let newState = currentState;
      newState.votes = this.state.votes - 0.5;

      return newState;
    });
  };

  render() {
    return (
      <li className='commentCard'>
        <div className='cardauthor'>
          <h4 className='cardAuthorName'>Author: {this.props.data.author}</h4>
          <UserAvatar author={this.props.data.author} />
        </div>
        <p className='cardBody'> {this.props.data.body}...</p>
        <div className='commentVotes'>
          {' '}
          <button className='downVote' name='decrease' onClick={this.downVote}>
            -
          </button>
          <p className='singleCommentVotes'>Votes: {this.state.votes}</p>{' '}
          <button className='upVote' name='increase' onClick={this.upVote}>
            +
          </button>
        </div>
        <button className='deleteCommentButton' onClick={this.validateDelete}>
          Delete Comment
        </button>
        {this.state.showWarning && <h5>Only the author can do this</h5>}
      </li>
    );
  }
}

export default CommentCard;
