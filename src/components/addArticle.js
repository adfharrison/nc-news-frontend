import React from 'react';
import { postArticle, postTopic } from './api';
class AddArticle extends React.Component {
  state = {
    author: '',
    topic: '',
    title: '',
    body: '',
    newArticle: null,
  };

  componentDidMount() {
    this.setState({ author: this.props.username });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const topicRequest = {
      newTopic: {
        description: this.state.topic,
        slug: this.state.topic,
      },
    };

    const postedTopic = await postTopic(topicRequest);

    const articleRequest = {
      newArticle: {
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        topic: this.state.topic,
      },
    };

    const postedArticle = await postArticle(articleRequest);
    this.setState({ newArticle: true });
  }
  render() {
    return (
      <div className='addArticleContainer'>
        <h2 className='newArticleTitle'>Add Article</h2>
        <form
          className='newArticleForm'
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <label htmlFor='title' className='formElement'>
            Title:
            <input
              type='text'
              id='title'
              name='title'
              value={this.state.title}
              onChange={(event) => this.handleChange(event)}
            ></input>
          </label>
          <label htmlFor='topic' className='formElement'>
            Topic:
            <input
              type='text'
              id='topic'
              name='topic'
              value={this.state.topic}
              onChange={(event) => this.handleChange(event)}
            ></input>
          </label>
          <label htmlFor='body' className='formElement'>
            Article:
            <textarea
              id='body'
              name='body'
              value={this.state.body}
              placeholder='your article here'
              onChange={(event) => this.handleChange(event)}
            ></textarea>
          </label>
          <button className='articleSubmitButton' type='submit'>
            Send
          </button>{' '}
          <div className='submitSuccess'>
            {this.state.newArticle ? (
              <h3>Article succesfully posted!</h3>
            ) : (
              <h4> Please submit article</h4>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default AddArticle;
