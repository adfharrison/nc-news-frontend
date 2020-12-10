import React from 'react';

const ErrorMessage = (props) => {
  return (
    <div className='errorMessage'>
      <p> {props.errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
