import React from 'react';

import Axios from 'axios';
import { Link } from '@reach/router';

import { getUsers, sendNewUser } from './api';
import Loading from './loading';

class Login extends React.Component {
  state = {
    usernames: [],
    username: '',
    newUsername: '',
    name: '',
    avatar_url: '',
    updateSuccess: false,
    isLoading: true,
    showSignup: false,
  };

  async componentDidMount() {
    try {
      const users = await getUsers();
      const usernames = users.map((user) => {
        return user.username;
      });
      this.setState({ usernames, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUserSubmit(event) {
    event.preventDefault();
    const validUser = this.state.usernames.includes(this.state.username);
    if (validUser) {
      this.props.verifyUser(true, true, this.state.username);
    }
  }

  async handleNewUserSubmit(event) {
    event.preventDefault();
    try {
      const newUser = {
        username: this.state.newUsername,
        name: this.state.name,
        avatar_url: this.state.avatar_url,
      };
      const data = await sendNewUser(newUser);
      if (data.newUser.username) {
        this.setState({ updateSuccess: true });
      }

      if (this.state.updateSuccess) {
        this.props.verifyUser(true, true, this.state.newUsername);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleShowSignup(event) {
    event.preventDefault();
    this.setState({ showSignup: true });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else if (!this.state.showSignup) {
      return (
        <div className='loginContainer'>
          <h1 className='loginTitle'>Login</h1>
          <div className='existingUser'>
            <form
              className='loginEntry'
              onSubmit={(event) => this.handleUserSubmit(event)}
            >
              <label htmlFor='username'>
                Enter Username
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={this.state.username}
                  onChange={(event) => this.handleChange(event)}
                ></input>
              </label>

              <button className='loginButton' type='submit'>
                {' '}
                Login{' '}
              </button>
            </form>
          </div>
          <div className='showSignup'>
            <button
              className='showSignupButton'
              onClick={(event) => this.handleShowSignup(event)}
            >
              New Users
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className='loginContainer'>
          <h1 className='loginTitle'>Login</h1>
          <div className='existingUser'>
            <form
              className='loginEntry'
              onSubmit={(event) => this.handleUserSubmit(event)}
            >
              <label htmlFor='username'>
                Enter Username
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={this.state.username}
                  onChange={(event) => this.handleChange(event)}
                ></input>
              </label>
              <button className='loginButton' type='submit'>
                {' '}
                Login{' '}
              </button>
            </form>
          </div>
          <div className='signup'>
            <h1 className='signupTitle'>Signup</h1>
            <div className='newUser'>
              <form
                className='signupEntry'
                onSubmit={(event) => this.handleNewUserSubmit(event)}
              >
                <label htmlFor='username'>
                  Enter New Username
                  <input
                    type='text'
                    id='newUsername'
                    name='newUsername'
                    value={this.state.newUsername}
                    onChange={(event) => this.handleChange(event)}
                  ></input>
                </label>
                <label htmlFor='name'>
                  Enter your name
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={this.state.name}
                    onChange={(event) => this.handleChange(event)}
                  ></input>
                </label>
                <label htmlFor='avatar_url'>
                  Enter your avatar URL
                  <input
                    type='text'
                    id='avatar_url'
                    name='avatar_url'
                    value={this.state.avatar_url}
                    onChange={(event) => this.handleChange(event)}
                  ></input>
                </label>

                <button className='loginButton' type='submit'>
                  {' '}
                  Submit + Login{' '}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
