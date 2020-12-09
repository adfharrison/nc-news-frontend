import React from 'react';

const CommentCard = (props) => {
  return (
    <li className='commentCard'>
      <h4 className='cardauthor'>Author: {props.data.author}</h4>

      <p className='cardBody'> {props.data.body}...</p>
      <p className='cardVotes'>Votes: {props.data.votes}</p>
    </li>
  );
};

export default CommentCard;
