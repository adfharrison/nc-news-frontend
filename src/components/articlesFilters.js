import React from 'react';

const ArticlesFilters = (props) => {
  return (
    <div className='filters'>
      <label htmlFor='showArticles' className='topicFilter'>
        Show Topics
        <select
          className='filterSelect'
          name='topicToChange'
          id='topicToChange'
          onChange={props.topicHandler}
        >
          <option value='all'>All</option>
          {props.topics.map((topic) => {
            return (
              <option key={topic} value={topic}>
                {topic}
              </option>
            );
          })}
        </select>
      </label>
      <form
        className='filtersForm'
        onSubmit={(event) => {
          props.submitFilters(event);
        }}
      >
        <div className='articleFilters'>
          <label htmlFor='sort_by' className='filterLabel'>
            Sort by
            <select
              className='filterSelect'
              name='sort_by'
              id='sort_by'
              onChange={props.changeHandler}
            >
              {' '}
              <option value='created_at'> Date</option>
              <option value='author'>Author</option>
              <option value='title'> Title</option>
              <option value='votes'> Votes</option>
            </select>
          </label>
          <label htmlFor='order' className='filterLabel'>
            Order
            <select
              name='order'
              id='order'
              className='filterSelect'
              onChange={props.changeHandler}
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </select>
          </label>
        </div>
        <button className='searchButton'>Search</button>
      </form>
    </div>
  );
};

export default ArticlesFilters;
