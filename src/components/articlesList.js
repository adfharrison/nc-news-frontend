import React from 'react';
import { getAllArticles, getAllTopics, removeArticle } from './api';
import Loading from './loading';
import ArticleCard from './articleCard';
import ArticlesFilters from './articlesFilters';

class Articles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    articleCount: undefined,
    error: undefined,

    topics: [],
    topicToCheck: 'all',
    username: '',
    params: { limit: 100, order: 'asc', sort_by: 'created_at' },
    rerender: false,
    singleAuthor: false,
    author_id: '',
  };

  async componentDidMount() {
    const topics = await getAllTopics();

    const articles = await getAllArticles(this.state.params);
    const articleCount = articles.length;
    this.setState({
      articles,

      isLoading: false,
      topics,
      articleCount,
      username: this.props.username,
      singleAuthor: this.props.singleAuthor,
      author_id: this.props.author_id,
    });
  }
  catch(error) {
    console.log(error);
    this.setState({ error });
  }

  deleteArticle = async (article_id) => {
    const deleteConfirmed = await removeArticle(article_id);
    const topic = this.state.topicToCheck;
    const topics = await getAllTopics();
    const articlesArray = await getAllArticles(this.state.params);
    const articles = articlesArray.filter((article) => {
      return topic === 'all' ? article : article.topic === topic;
    });
    const articleCount = articles.length;

    if (deleteConfirmed === 204)
      this.setState({
        topicToCheck: topic,
        articles: articles,
        isLoading: false,
        topics,
        articleCount,
      });
  };

  topicHandler = async (event) => {
    const topic = event.target.value;

    const articlesArray = await getAllArticles(this.state.params);
    const articles = articlesArray.filter((article) => {
      return topic === 'all' ? article : article.topic === topic;
    });

    this.setState({ articles: articles, topicToCheck: topic });
  };

  changeHandler = (event) => {
    this.setState((currentState) => {
      const newState = {
        params: {
          ...currentState.params,
          [event.target.name]: event.target.value,
        },
      };
      return newState;
    });
  };

  submitFilters = (event) => {
    event.preventDefault();
    getAllArticles(this.state.params).then((articles) => {
      this.setState({
        articles,
        isLoading: false,
        articleCount: articles.length,
      });
    });
  };

  //rerenderList = () => {
  //  this.setState({ rerender: true });
  //};

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className='articles'>
          <h3 className='articlesTitle'>Articles</h3>

          <ArticlesFilters
            topics={this.state.topics}
            topicHandler={this.topicHandler}
            changeHandler={this.changeHandler}
            submitFilters={this.submitFilters}
          />

          <ul className='articlesList'>
            {this.state.articles.map((article) => {
              return (
                <ArticleCard
                  deleteArticle={this.deleteArticle}
                  key={article.article_id}
                  data={article}
                  username={this.state.username}
                  //rerenderList={this.rerenderList}
                />
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Articles;
