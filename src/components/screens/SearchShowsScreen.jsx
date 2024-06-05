import React, { useEffect, useState, useCallback  } from 'react';
import TmdbService from '../../services/TmdbService';
import ShowCard from '../shared/cards/ShowCard'
import SearchForm from '../shared/SearchForm';

const SearchShowsScreen = () => {

  const [shows, setMovies] = useState([]);
  // const [query, setQuery] = useState(initialQuery);

  const search = async (query) => {
    const tmp = await TmdbService.searchShows(query);
    console.log(tmp[0]);
    setMovies(query.length > 0 ?
      tmp :
      []);
  };

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
