import React from 'react';
import { getUsers } from './api';

class UserAvatar extends React.Component {
  state = {
    url: '',
  };

  async componentDidMount() {
    const users = await getUsers();
    const thisUser = users.filter((user) => {
      return user.username === this.props.author;
    });
    let url = '';
    if (thisUser[0].username !== null) {
      url = thisUser[0].avatar_url;
    }

    this.setState({ url });
  }

  render() {
    return (
      <img
        className='avatarImg'
        src={this.state.url}
        alt='authors avatar'
      ></img>
    );
  }
}

export default UserAvatar;
