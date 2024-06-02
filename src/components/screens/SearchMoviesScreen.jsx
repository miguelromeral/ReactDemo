import React, { useEffect, useState } from 'react';
import TmdbService from '../../services/TmdbService';
import Movie from '../Movie'

const SearchMoviesScreen = () => {

  const initialQuery = 'Sonic';

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(initialQuery);

  const search = async (event) => {
    console.log(event.target.value);
    setQuery(event.target.value);

    setMovies(await TmdbService.searchMovies(query));
  };

  return (
    <>
      <h1>Search Movies</h1>
      <form>
        <input type="text" name="movieQuery" value={query}
          onChange={(event) => search(event)}/>
      </form>
      <div>
        {movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default SearchMoviesScreen;
