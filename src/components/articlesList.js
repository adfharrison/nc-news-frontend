import React from 'react';
import { getAllArticles } from './api';
import Loading from './loading';
import Card from './articleCard';

class Articles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    articleCount: undefined,
    error: undefined,
    query: {},
    topics: [],
    topicToCheck: 'all',
  };

  async componentDidMount() {
    const articlesArr = await getAllArticles();
    const topics = this.getUniqueTopics(articlesArr);

    const articles = this.topicCheck(articlesArr, this.state.topicToCheck);
    const articleCount = articles.length;
    this.setState({ articles, isLoading: false, topics, articleCount });
  }
  catch(error) {
    console.log(error);
    this.setState({ error });
  }
  topicCheck = (articles, topic) => {
    let result = [];
    if (topic === 'all') {
      result = articles;
    } else {
      result = articles.filter((article) => {
        if (topic === article.topic) {
          return article;
        }
      });
    }
    return result;
  };

  getUniqueTopics = (articles) => {
    let topics = articles.map((article) => {
      return article.topic;
    });
    let uniqueTopics = topics.sort().filter((topic, index, topics) => {
      if (topic !== topics[index - 1]) {
        return topic;
      }
    });

    return uniqueTopics;
  };

  topicHandler = (event) => {
    this.setState({ topicToCheck: event.target.value });
  };

  changeHandler = (event) => {
    this.setState((currentState) => {
      const newState = {
        query: {
          ...currentState.query,
          [event.target.name]: event.target.value,
        },
      };
      return newState;
    });
  };

  submitFilters = (event) => {
    event.preventDefault();
    getAllArticles(this.state.query).then((articles) => {
      this.setState({
        articles,
        isLoading: false,
        articleCount: articles.length,
      });
    });
  };

  render() {
    console.log(this.state, 'STATE IN LIST');
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className='articles'>
          <h3>Articles</h3>
          <div className='filters'>
            <form
              className='filtersForm'
              onSubmit={(event) => {
                this.submitFilters(event);
              }}
            >
              <div className='articleFilters'>
                <label htmlFor='showArticles' className='filterLabel'>
                  Show Topics
                  <select
                    className='filterSelect'
                    name='topicToChange'
                    id='topicToChange'
                    onChange={this.topicHandler}
                  >
                    <option value='all'>All</option>
                    {this.state.topics.map((topic) => {
                      return (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <label htmlFor='sort_by' className='filterLabel'>
                  Sort by
                  <select
                    className='filterSelect'
                    name='sort_by'
                    id='sort_by'
                    onChange={this.changeHandler}
                  >
                    <option value='author'>Author</option>
                    <option value='title'> Title</option>
                    <option value='date'> Date</option>
                    <option value='votes'> Votes</option>
                  </select>
                </label>
                <label htmlFor='order' className='filterLabel'>
                  Order
                  <select
                    name='order'
                    id='order'
                    className='filterSelect'
                    onChange={this.changeHandler}
                  >
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                  </select>
                </label>
              </div>
              <button className='searchButton'>Search</button>
            </form>
          </div>

          <ul className='articlesList'>
            {this.state.articles.map((article) => {
              return <Card key={article._id} data={article} />;
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Articles;
