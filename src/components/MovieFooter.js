import React from 'react';

const MovieFooter = (props) => {
  const { totalMovies } = props;

  return (
    <div className="bg-white p-4 shadow rounded-md dark:bg-slate-800">
      <b>{totalMovies}</b> film gösteriliyor
    </div>
  );
}

export default MovieFooter;