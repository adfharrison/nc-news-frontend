import './css/App.css';
import './css/login.css';
import React from 'react';
import { Router } from '@reach/router';
import Axios from 'axios';
import { Link } from '@reach/router';
import Login from './components/login';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    correctUsername: false,
    currentUsername: '',
  };

  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem('state'));
    // take the saved state, spreading it into state and also overwrite checkedlocal key to true
    this.setState({ ...savedState });
  }

  verifyUser = (isLoggedIn, correctUsername, currentUsername) => {
    this.setState({ isLoggedIn, correctUsername, currentUsername }, () => {
      if (isLoggedIn) {
        localStorage.setItem('state', JSON.stringify(this.state));
      }
    });
  };
  render() {
    console.log(this.state, 'APP STATE');
    if (!this.state.isLoggedIn) {
      return <Login verifyUser={this.verifyUser} />;
    } else {
      return <h1>WELCOME!</h1>;
    }
  }
}

export default App;
