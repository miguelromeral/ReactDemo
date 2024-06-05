import React, { useEffect, useState, useCallback  } from 'react';
import TmdbService from '../../../services/TmdbService';
import MovieCard from '../../shared/cards/MovieCard'
import SearchForm from '../../shared/SearchForm';

const SearchMoviesScreen = () => {

  const [movies, setMovies] = useState([]);

  const search = async (query) => {
    setMovies(query.length > 0 ?
      await TmdbService.searchMovies(query) :
      []);
  };

  const listaMovies = movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  const notFound = <div className='flex flex-col items-center'>Nada por aquí 😓</div>

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
