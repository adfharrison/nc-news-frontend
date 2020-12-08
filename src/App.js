import './css/App.css';
import './css/login.css';
import React from 'react';
import { Router } from '@reach/router';
import Axios from 'axios';
import { Link, Redirect } from '@reach/router';
import Login from './components/login';
import Loading from './components/loading';
import Title from './components/header';
import Nav from './components/nav';
import Articles from './components/articlesList';
import SingleArticle from './components/singleArticle';
import AddArticle from './components/addArticle';
import Home from './components/home';

class App extends React.Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    correctUsername: false,
    currentUsername: '',
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
      }
    });
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
  };
  render() {
    console.log(this.state, 'APP STATE');
    if (!this.state.isLoggedIn) {
      return <Login verifyUser={this.verifyUser} path='/' />;
    } else if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className='app'>
          <div className='header'>
            <Title />
            <Nav logout={this.logout} />
          </div>

          <Router>
            <Home path='/' />
            <Articles path='/articles' />
            <SingleArticle path='/articles/:article_id' />
            <AddArticle path='/articles/add_article' />
          </Router>
        </div>
      );
    }
  }
}

export default App;
