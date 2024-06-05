import '../styles/movie-item.scss';

import React, { useEffect, useMemo, useState } from 'react';
import TmdbService from '../services/TmdbService';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const Movie = ({movie}) => {

  const imgPath =  useMemo(() => TmdbService.getImageFullPath(movie.poster_path), [movie.id]);
  const bgImage = useMemo(() => TmdbService.getImageFullPath(movie.backdrop_path), [movie.id]);

  const scoreClasses = useMemo(() => {
    if(movie.vote_average > 7){
      return 'bg-green-300';
    }else if(movie.vote_average > 5){
      return 'bg-yellow-300';
    }else if(movie.vote_average > 0){
      return 'bg-red-300 text-white';
    }else{
      return 'hidden';
    }
  }, [movie.id]);

  return (
    <div class='border transition-all border-blue-500 hover:bg-blue-100 my-2 rounded-md p-3 relative grid grid-cols-3 overflow-hidden group' key={movie.id}>
      <div className='transition-all absolute z-0 max-h-20 group-hover:max-h-40 overflow-hidden flex justify-center align-items-center'>
        <img class='object-cover blur-sm group-hover:blur-none transition-all' src={bgImage} />
      </div>
      <div class='z-10'>
        <img className='movie-poster' src={imgPath} />
      </div>
      <div className='transition-all col-span-2 z-10 mt-20 group-hover:mt-40'>
        <div class='text-lg mr-5 font-bold text-blue-500'>
          {movie.title}
        </div>
        <div class='text-xs font-light italic text-custom'>
          {movie.overview}
        </div>
        <div className=' bg-green-100 text-green-900 text-xs font-medium px-2 rounded-full grid grid-cols-2 w-fit relative mt-2'>
          <HandThumbUpIcon className='h-4'/>
          <span>{movie.vote_count}</span>
        </div>
        <div className={`absolute rounded-full h-8 w-8 top-2 right-2 ${scoreClasses} font-bold
          flex items-center justify-center`} title={movie.vote_average}>
          <span>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
