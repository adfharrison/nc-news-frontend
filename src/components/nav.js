import React from 'react';
import { Link } from '@reach/router';

const Nav = () => {
  const logout = () => {
    props.logout();
  };
  return (
    <div className='nav'>
      <Link to='/articles'>
        <button className='navArticlesList navButton'>Articles</button>
      </Link>{' '}
      <Link to='/articles/add_article'>
        <button className='navNewArticle navButton'>Create Article</button>
      </Link>
      <Link to='/login'>
        <button className='navLogout navButton' onClick={() => this.logout()}>
          Logout
        </button>
      </Link>
    </div>
  );
};
export default Nav;
