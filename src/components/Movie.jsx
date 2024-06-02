import '../styles/movie-item.scss';

import React, { useEffect, useState } from 'react';
import TmdbService from '../services/TmdbService';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const Movie = ({movie}) => {

  const imgPath = TmdbService.getImageFullPath(movie.poster_path);
  // console.log(imgPath);
  const bgImage = TmdbService.getImageFullPath(movie.backdrop_path);

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
        <div className='resumen'>
          {movie.overview}
        </div>
        <div className='likes-container'>
          <HandThumbUpIcon className='twi'/>
          <span>{movie.vote_count}</span>
        </div>
        <div className='score' title={movie.vote_average}>
          <span>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
