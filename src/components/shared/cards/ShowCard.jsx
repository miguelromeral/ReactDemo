import React, { useEffect, useMemo, useState } from 'react';
import TmdbService from '../../../services/TmdbService';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import CustomizeService from '../../../services/CustomizeService';
import TemplateCard from './TemplateCard';

const ShowCard = ({show}) => {
  
  return (
    <TemplateCard
      id={show.id} 
      urlSuffix={'show'}
      poster={show.poster_path} 
      title={show.name}
      overview={show.overview}
      vote_average={show.vote_average}
      />
  );
};

export default ShowCard;
