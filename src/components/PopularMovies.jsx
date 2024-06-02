import React, { useEffect, useState } from 'react';
import tmdbService from '../services/TmdbService';
import Movie from './Movie';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await tmdbService.getPopularMovies();
        setMovies(popularMovies);
        setLoading(false);
        // console.log(popularMovies[0]);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Popular Movies</h1>
      <div>
        {movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
