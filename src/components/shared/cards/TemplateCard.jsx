import React, { useEffect, useMemo, useState } from 'react';
import TmdbService from '../../../services/TmdbService';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import CustomizeService from '../../../services/CustomizeService';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function TemplateCard({ id, urlSuffix, title, overview, poster, vote_average, children }) {

  const { t, i18n } = useTranslation();

  const [imgLoaded, setImgLoaded] = useState(false);
  const scoreClasses = useMemo(() => CustomizeService.getClassScore(vote_average), [id]);

  return <>
    <div className='transition-all bg-white dark:bg-slate-800 hover:bg-blue-100  my-2 rounded-md relative flex flex-wrap overflow-hidden group shadow-lg' key={id}>
      <div className='w-24'>
        {!imgLoaded && (
          <div className="bg-gray-300 dark:bg-slate-700 animate-pulse"></div>
        )}
        
        <Link to={`/${urlSuffix}/${id}`}>
          <img className='' src={TmdbService.getImageFullPath(poster)} 
            onLoad={() => setImgLoaded(true)} 
            />
        </Link>
      </div>
      <div className='transition-all flex-1 mx-2'>
        <div className='text-lg mr-5 font-bold text-blue-700 dark:text-white
         group-hover:text-blue-900 group-hover:dark:text-white my-2'>
          <a href={`/${urlSuffix}/${id}`}>
            {title}
          </a>
        </div>
        <div className='flex-1'>
        <div className='max-h-16 overflow-hidden text-xs
         text-slate-400 dark:text-gray-400
          group-hover:text-slate-900 group-hover:dark:text-gray-300'>
          <span className='text-ellipsis'>
            {overview}
          </span>
        </div>
        {/* <div className=' bg-green-100 text-green-900 text-xs font-medium px-2 rounded-full grid grid-cols-2 w-fit relative mt-2'>
          <HandThumbUpIcon className='h-4'/>
          <span>{vote_count}</span>
        </div> */}
        <div className={`absolute rounded-full h-8 w-8 top-2 right-2 ${scoreClasses} font-bold
          flex items-center justify-center`} title={vote_average}>
          <span className={vote_average > 0 ? '' : 'hidden'}>
            {(vote_average ?? 0).toFixed(1)}
          </span>
        </div>
        <div>
          {children}
        </div>
        </div>
      </div>
    </div>
  </>
}

export default TemplateCard;