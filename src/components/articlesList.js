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
  };

  async componentDidMount() {
    const articles = await getAllArticles();
    this.setState({ articles, isLoading: false });
  }
  catch(error) {
    console.log(error);
    this.setState({ error });
  }

  render() {
    console.log(this.state, 'STATE IN LIST');
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className='articles'>
          <h3>Articles</h3>
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
