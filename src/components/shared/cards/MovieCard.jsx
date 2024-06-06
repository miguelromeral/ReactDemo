import React, { useEffect, useMemo, useState } from 'react';
import TmdbService from '../../../services/TmdbService';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import CustomizeService from '../../../services/CustomizeService';
import TemplateCard from './TemplateCard';

const MovieCard = ({movie}) => {
  
  return (
    <TemplateCard 
      id={movie.id} 
      urlSuffix={'movie'}
      poster={movie.poster_path} 
      title={movie.title}
      overview={movie.overview}
      vote_average={movie.vote_average}
      />
  );
};

export default MovieCard;
