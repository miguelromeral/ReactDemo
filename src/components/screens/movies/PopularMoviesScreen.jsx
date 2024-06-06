import React, { useEffect, useState } from 'react';
import TmdbService from '../../../services/TmdbService';
import MovieCard from '../../shared/cards/MovieCard';
import { useTranslation } from 'react-i18next';

const PopularMoviesScreen = () => {
  const { t, i18n } = useTranslation();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        console.log("Searching por Popular Movies");
        const popularMovies = await TmdbService.getPopularMovies();
        setMovies(popularMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, [i18n.language]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='container mx-auto px-2'>
        <h1 className='text-2xl font-bold py-2'>{t("screens.popular.title")}</h1>
        {movies.sort((a,b) => b.popularity - a.popularity).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesScreen;
