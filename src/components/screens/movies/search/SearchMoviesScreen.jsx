import React, { useEffect, useState, useCallback, useTransition  } from 'react';
import TmdbService from '../../../../services/TmdbService';
import MovieCard from '../../../shared/cards/MovieCard'
import SearchForm from '../../../shared/forms/SearchForm';
import { t } from 'i18next';
import i18n from '../../../../i18n';
import { useTranslation } from 'react-i18next';

const SearchMoviesScreen = () => {
  const { t, i18n } = useTranslation();

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);


  const search = async (query) => {
    setQuery(query);
    setMovies(query.length > 0 ?
      await TmdbService.searchMovies(query) :
      []);
  };
  
  useEffect(() => {
    search(query);
  }, [i18n.language]);

  const listaMovies = movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  const notFound = <div className='flex flex-col items-center'>
    {t('screens.movies.search.not_found')}
  </div>

  return (
    <div class='grid gap-6 mb-6 gird-cols-1 mx-2'>
    <SearchForm 
      label='Buscar Películas'
      placeholder='Título de la Película'
      onChange={search}/>
      <div>
        {
          movies.length > 0 ? listaMovies : notFound
        }
      </div>
    </div>
  );
};

export default SearchMoviesScreen;
