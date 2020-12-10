import React from 'react';
import { postArticle, postTopic, getAllTopics } from './api';
class AddArticle extends React.Component {
  state = {
    author: '',
    topic: '',
    title: '',
    body: '',
    newArticle: null,
    topics: [],
    existingTopic: 'new',
  };

  async componentDidMount() {
    const topics = await getAllTopics();
    this.setState({ author: this.props.username, topics });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleExistingTopic(event) {
    const existingTopic = event.target.value;
    this.setState({ existingTopic });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const topicRequest = {
      newTopic: {
        description: this.state.topic,
        slug: this.state.topic,
      },
    };

    postTopic(topicRequest);
    let requestTopic = '';
    if (this.state.existingTopic === 'new') {
      requestTopic = this.state.topic;
    } else {
      requestTopic = this.state.existingTopic;
    }

    const articleRequest = {
      newArticle: {
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        topic: requestTopic,
      },
    };

    const postedArticle = await postArticle(articleRequest);
    this.setState({ newArticle: true });
  }

  render() {
    console.log(this.state);
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
          {/* ADD EXISTING TOPICS HERE */}
          <label htmlFor='existingTopics' className='formElement'>
            select existing topic
            <select
              className='filterSelect'
              name='existingTopics'
              id='existingTopics'
              onChange={(event) => this.handleExistingTopic(event)}
            >
              <option value='new'>New</option>
              {this.state.topics.map((topic) => {
                return (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                );
              })}
            </select>
          </label>
          {/* ADD EXISTING TOPICS HERE */}
          <label htmlFor='topic' className='formElement'>
            If you chose New:
            <input
              type='text'
              id='topic'
              name='topic'
              placeholder='please enter new topic'
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
