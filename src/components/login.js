import React from 'react';

import { getUsers, sendNewUser } from './api';
import Loading from './loading';
import LoginRender from './loginRender';

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleUserSubmit = (event) => {
    event.preventDefault();
    const validUser = this.state.usernames.includes(this.state.username);
    if (validUser) {
      this.props.verifyUser(true, true, this.state.username);
    }
  };

  handleNewUserSubmit = async (event) => {
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
  };

  handleShowSignup = () => {
    this.setState({ showSignup: true });
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else if (!this.state.showSignup) {
      return (
        <div className='loginContainer'>
          <h2 className='loginTitle'>Northcoders News</h2>
          <h3 className='loginSubtitle'>Login</h3>
          <LoginRender
            handleUserSubmit={this.handleUserSubmit}
            handleChange={this.handleChange}
            handleShowSignup={this.handleShowSignup}
            username={this.state.username}
          />
        </div>
      );
    } else {
      return (
        <div className='loginContainer'>
          <h1 className='loginTitle'>Login</h1>
          <LoginRender
            handleUserSubmit={this.handleUserSubmit}
            handleChange={this.handleChange}
            handleShowSignup={this.handleShowSignup}
            username={this.state.username}
          />
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
