import React from 'react';

const ErrorMessage = (props) => {
  return (
    <div className='errorMessageContainer'>
      <div className='errorMessage'>
        <p className='errorP'> {props.errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
