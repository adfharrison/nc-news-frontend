import { Link } from '@reach/router';

const Card = (props) => {
  return (
    <li className='articleCard'>
      <h4 className='cardTitle'>Title: {props.data.title}</h4>
      <h4 className='cardauthor'>Author: {props.data.author}</h4>

      <p className='cardBody'> {props.data.body.slice(0, 120)}...</p>
      <p className='cardVotes'>Votes: {props.data.votes}</p>
      <p className='cardComments'>Comments: {props.data.comment_count}</p>

      <Link to={`/articles/${props.data.article_id}`}>
        <button className='cardButton'>Click to see article </button>
      </Link>
    </li>
  );
};

export default Card;
