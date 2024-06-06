import React, { useEffect, useState, useCallback  } from 'react';
import TmdbService from '../../../services/TmdbService';
import ShowCard from '../../shared/cards/ShowCard'
import SearchForm from '../../shared/forms/SearchForm';
import { useTranslation } from 'react-i18next';

const SearchShowsScreen = () => {
  const { t, i18n } = useTranslation();

  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);

  const search = async (query) => {
    setQuery(query);
    setShows(query.length > 0 ?
      await TmdbService.searchShows(query) :
      []);
  };
  
  useEffect(() => {
    search(query);
  }, [i18n.language]);

  const listaShows = shows.sort((a,b) => b.popularity - a.popularity).map((show) => (
    <ShowCard key={show.id} show={show} />
  ));

  const notFound = <div className='flex flex-col items-center'>Nada por aquí 😓</div>

  return (
    <div class='grid gap-6 mb-6 gird-cols-1 mx-2'>
      <SearchForm 
        label='Buscar TV Shows'
        placeholder='Título del TV Show'
        onChange={search}/>
      <div>
        {
          shows.length > 0 ? listaShows : notFound
        }
      </div>
    </div>
  );
};

export default SearchShowsScreen;
