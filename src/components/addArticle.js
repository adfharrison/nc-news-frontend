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
    return (
      <div className='addArticleContainer'>
        <h2 className='newArticleTitle'>Add Article</h2>
        <form
          className='newArticleForm'
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <div className='submitArticleTitle'>
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
          </div>
          {/* ADD EXISTING TOPICS HERE */}
          <div className='submitArticleTopic'>
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
          </div>
          {/* ADD EXISTING TOPICS HERE */}
          <div className='submitArticleNewTopic'>
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
          </div>
          <div className='submitArticleBody'>
            <label htmlFor='body' className='formElement'>
              Article:
              <textarea
                className='submitArticleTextarea'
                rows='6'
                id='body'
                name='body'
                value={this.state.body}
                placeholder='your article here'
                onChange={(event) => this.handleChange(event)}
              ></textarea>
            </label>
          </div>
          <button
            className='articleSubmitButton'
            type='submit'
            disabled={
              this.state.title.length < 1 ||
              this.state.body.length < 1 ||
              this.state.topic.length < 1
            }
          >
            Send
          </button>{' '}
          <div className='submitSuccess'>
            {this.state.newArticle ? (
              <h3>Article succesfully posted!</h3>
            ) : (
              <h4> Please complete all fields</h4>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default AddArticle;
