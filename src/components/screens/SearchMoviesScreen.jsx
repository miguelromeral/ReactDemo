import React, { useEffect, useState, useCallback  } from 'react';
import TmdbService from '../../services/TmdbService';
import Movie from '../Movie'

const SearchMoviesScreen = () => {

  const initialQuery = '';

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(initialQuery);

  const search = useCallback(async (event) => {
    // console.log(event.target.value);
    setQuery(event.target.value);

    setMovies(query.length > 0 ?
      await TmdbService.searchMovies(query) :
      []);
  }, [query]);

  const listaMovies = movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ));

  const notFound = <div>Nada por aquí 😓</div>

  return (
    <div class='grid gap-6 mb-6 gird-cols-1 mx-2'>
      <form>
        <div>
            <label for="iMovieQuery" class="block mb-2 text-sm font-medium text-gray-900 ">Buscar Películas</label>
            <input type="text" id="iMovieQuery" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Título de la Película" required
            name="movieQuery" value={query}
            onChange={(event) => search(event)} />
        </div>
      </form>
      <div>
        {
          movies.length > 0 ? listaMovies : notFound
        }
      </div>
    </div>
  );
};

export default SearchMoviesScreen;
