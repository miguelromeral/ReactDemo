import React, { useEffect, useMemo, useState } from 'react';
import TmdbService from '../../../services/TmdbService';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import CustomizeService from '../../../services/CustomizeService';

const MovieCard = ({movie}) => {
  
  const [imgLoaded, setImgLoaded] = useState(false);

  const imgPath =  useMemo(() => TmdbService.getImageFullPath(movie.poster_path), [movie.id]);
  const bgImage = useMemo(() => TmdbService.getImageFullPath(movie.backdrop_path), [movie.id]);

  const scoreClasses = useMemo(() => CustomizeService.getClassScore(movie.vote_average), [movie.id]);

  return (
    <div class='border transition-all border-blue-500 hover:bg-blue-100 my-2 rounded-md p-3 relative flex flex-wrap overflow-hidden group' key={movie.id}>
      <div class=''>
        {!imgLoaded && (
          <div className="movie-poster bg-gray-300 animate-pulse"></div>
        )}
        <img className='movie-poster' src={imgPath} 
          onLoad={() => setImgLoaded(true)} 
          />
      </div>
      <div className='transition-all flex-1 mx-2'>
        <div class='text-lg mr-5 font-bold text-blue-700 group-hover:text-blue-900'>
          <a href={`/movie/${movie.id}`}>
            {movie.title}
          </a>
        </div>
        <div class='text-xs text-slate-400 group-hover:text-slate-900'>
          {movie.overview}
        </div>
        <div className=' bg-green-100 text-green-900 text-xs font-medium px-2 rounded-full grid grid-cols-2 w-fit relative mt-2'>
          <HandThumbUpIcon className='h-4'/>
          <span>{movie.vote_count}</span>
        </div>
        <div className={`absolute rounded-full h-8 w-8 top-2 right-2 ${scoreClasses} font-bold
          flex items-center justify-center`} title={movie.vote_average}>
          <span>
            {(movie.vote_average ?? 0).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
