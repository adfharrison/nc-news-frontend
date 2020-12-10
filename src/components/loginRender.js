import React from 'react';

const LoginRender = (props) => {
  return (
    <>
      <div className='existingUser'>
        <form
          className='loginEntry'
          onSubmit={(event) => props.handleUserSubmit(event)}
        >
          <label htmlFor='username'>
            Enter Username
            <input
              type='text'
              id='username'
              name='username'
              value={props.username}
              onChange={(event) => props.handleChange(event)}
            ></input>
          </label>

          <button className='loginButton' type='submit'>
            {' '}
            Login{' '}
          </button>
        </form>
      </div>
      <div className='showSignup'>
        <button className='showSignupButton' onClick={props.handleShowSignup}>
          New Users
        </button>
      </div>
    </>
  );
};

export default LoginRender;
