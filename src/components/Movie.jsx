import '../styles/movie-item.scss';

import React, { useEffect, useState } from 'react';
import tmdbService from '../services/TmdbService';

const Movie = ({movie}) => {

  const imgPath = tmdbService.getImageFullPath(movie.poster_path);
  // console.log(imgPath);
  const bgImage = tmdbService.getImageFullPath(movie.backdrop_path);

  return (
    <div className='movie-container' key={movie.id}>
      <div className='background-image-container'>
        <img src={bgImage} />
      </div>
      <div className='img-container'>
        <img src={imgPath} />
      </div>
      <div className='details'>
        <div className='title'>
          {movie.title}
        </div>
      </div>
    </div>
  );
};

export default Movie;
