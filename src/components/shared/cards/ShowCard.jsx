import React, { useEffect, useMemo, useState } from 'react';
import TmdbService from '../../../services/TmdbService';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import CustomizeService from '../../../services/CustomizeService';

const ShowCard = ({show}) => {
  
  const [imgLoaded, setImgLoaded] = useState(false);

  const imgPath =  useMemo(() => TmdbService.getImageFullPath(show.poster_path), [show.id]);
  const bgImage = useMemo(() => TmdbService.getImageFullPath(show.backdrop_path), [show.id]);

  const scoreClasses = useMemo(() => CustomizeService.getClassScore(show.vote_average), [show.id]);

  return (
    <div className='border transition-all bg-white hover:bg-blue-100 my-2 rounded-md relative flex flex-wrap overflow-hidden group shadow-lg' key={show.id}>
      <div className='w-24'>
        {!imgLoaded && (
          <div className="movie-poster bg-gray-300 animate-pulse"></div>
        )}
        <img className='movie-poster' src={imgPath} 
          onLoad={() => setImgLoaded(true)} 
          />
      </div>
      <div className='transition-all flex-1 mx-2'>
        <div className='text-lg mr-5 font-bold text-blue-700 group-hover:text-blue-900 my-2'>
          <a href={`/show/${show.id}`}>
            {show.name}
          </a>
        </div>
        <div className='h-16 overflow-hidden text-ellipsis text-xs text-slate-400 group-hover:text-slate-900'>
          {show.overview}
        </div>
        <div className={`absolute rounded-full h-8 w-8 top-2 right-2 ${scoreClasses} font-bold
          flex items-center justify-center`} title={show.vote_average}>
          <span>
            {(show.vote_average ?? 0).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
