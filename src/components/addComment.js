import React from 'react';
import { postComment } from './api';

class AddComment extends React.Component {
  state = {
    article_id: '',
    username: '',
    body: '',
  };

  componentDidMount() {
    this.setState({
      username: this.props.username,
      article_id: this.props.article_id,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const request = {
      newComment: {
        username: this.state.username,
        body: this.state.body,
      },
    };
    const newComment = await postComment(this.state.article_id, request);
    console.log(newComment);
    this.props.commentAdded(newComment);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className='newCommentContainer'>
        <form
          className='newCommentForm'
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <label htmlFor='body'>
            Comment:
            <textarea
              id='body'
              name='body'
              value={this.state.body}
              placeholder='your comment here'
              onChange={(event) => this.handleChange(event)}
            ></textarea>
          </label>
          <button className='submitButton' type='submit'>
            Send
          </button>
        </form>
      </div>
    );
  }
}
export default AddComment;
