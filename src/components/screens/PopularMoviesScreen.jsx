import React, { useEffect, useState } from 'react';
import TmdbService from '../../services/TmdbService';
import MovieCard from '../shared/cards/MovieCard';

const PopularMoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await TmdbService.getPopularMovies();
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
      <div className='container mx-auto px-2'>
        <h1 className='text-2xl font-bold py-2'>Popular Movies</h1>
        {movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesScreen;
