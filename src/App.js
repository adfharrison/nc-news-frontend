import './css/App.css';
import './css/login.css';
import './css/list.css';
import './css/comments.css';
import './css/addArticle.css';
import './css/singleArticle.css';
import React from 'react';
import { Router, navigate } from '@reach/router';

import Login from './components/login';
import Loading from './components/loading';
import Title from './components/header';
import Nav from './components/nav';
import Articles from './components/articlesList';
import SingleArticle from './components/singleArticle';
import AddArticle from './components/addArticle';
import Home from './components/home';
import ErrorMessage from './components/errorMessage';

class App extends React.Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    correctUsername: false,
    currentUsername: '',
    rerender: false,
  };

  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem('state'));
    // take the saved state, spreading it into state and also overwrite checkedlocal key to true
    this.setState({ ...savedState, isLoading: false });
  }

  verifyUser = (isLoggedIn, correctUsername, currentUsername) => {
    this.setState({ isLoggedIn, correctUsername, currentUsername }, () => {
      if (isLoggedIn) {
        localStorage.setItem('state', JSON.stringify(this.state));
        navigate(`/home`);
      }
    });
  };

  logout = () => {
    const stateToMemory = this.state;
    stateToMemory.isLoggedIn = false;
    localStorage.setItem('state', JSON.stringify(stateToMemory));
    navigate('/');
    this.setState({ isLoggedIn: false });
  };
  render() {
    // if (!this.state.isLoggedIn) {
    //   return <Login verifyUser={this.verifyUser} />;
    // } else
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className='app'>
          {this.state.isLoggedIn ? (
            <>
              <div className='header'>
                <Title />
                <Nav logout={this.logout} />
              </div>

              <Router>
                <Home path='/home' />
                <Articles
                  path='/articles'
                  username={this.state.currentUsername}
                />
                <SingleArticle
                  path='/articles/:article_id'
                  username={this.state.currentUsername}
                />
                <AddArticle
                  path='/articles/add_article'
                  username={this.state.currentUsername}
                />
                <Login verifyUser={this.verifyUser} path='/' />
                <ErrorMessage
                  default
                  errorMessage={'Error 404: Page Does Not Exist'}
                />
              </Router>
            </>
          ) : (
            <Login verifyUser={this.verifyUser} path='/' />
          )}
        </div>
      );
    }
  }
}

export default App;
