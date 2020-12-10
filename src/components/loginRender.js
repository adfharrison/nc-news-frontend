import React from 'react';

const LoginRender = (props) => {
  return (
    <>
      <div className='existingUser'>
        <form
          className='loginEntry'
          onSubmit={(event) => props.handleUserSubmit(event)}
        >
          <div className='userNameTitle'>
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
          </div>
          <div className='loginButton'>
            <button type='loginSubmit'> Login </button>
          </div>
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
