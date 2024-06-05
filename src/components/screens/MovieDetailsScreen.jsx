import React, { useEffect, useState, useMemo } from 'react';
import TmdbService from '../../services/TmdbService';
import CustomizeService from '../../services/CustomizeService';
import { useParams } from 'react-router-dom';
import Movie from '../Movie';
import { BanknotesIcon, TicketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const MovieDetailsScreen = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const bgImage = useMemo(() => TmdbService.getImageFullPath(movie.backdrop_path), [movie.id]);
  const posterImage = useMemo(() => TmdbService.getImageFullPath(movie.poster_path), [movie.id]);
  const releaseDate = useMemo(() => CustomizeService.printDate(movie.release_date), [movie.id]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await TmdbService.movieDetails(id);
        setMovie(data);
        console.log(data);
        document.title = data.title;
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const adultBanner = movie.adult ? 
    <div className='bg-red-200 border-red-600 text-red-700 p-2 rounded-md mb-2'>Adult Content</div> : 
    <></>;
    const budgetTemplate = movie.budget > 0 ? 
      <p className='flex flex-nowrap items-center text-red-700'>
        <BanknotesIcon className='h-5 pr-2' />
        <span>{CustomizeService.printMoney(movie.budget)}</span>
      </p> : <></>;
  const revenueTemplate = movie.revenue > 0 ? 
  <p className='flex flex-nowrap items-center text-green-700 px-4'>
  <TicketIcon className='h-5 pr-2' />
  <span>{CustomizeService.printMoney(movie.revenue)}</span>
</p> : <></>;

  const homepageTemplate = movie.homepage ? 
    <div className='my-4'>
      <a href={movie.homepage} target='_blank'>
        <GlobeAltIcon className='h-4'/>
      </a>
    </div>
  : '';

  return (
    <>
    <div className='transition-all ease-in-out max-h-36 group hover:max-h-96 overflow-hidden flex justify-center items-center'>
      <img src={bgImage} className='transition-all object-cover' />
    </div>
    <div className='container mx-auto'>
      <div className='flex flex-wrap justify-center my-6'>
        <img src={posterImage} className='h-full w-32 sm:w-64 mx-4 rounded-md shadow-md' />
        <div className='flex-1 flex flex-wrap flex-col mx-2'>
          { adultBanner }
          <h1 className='text-3xl font-extrabold'>{movie.title}</h1>
          <p className='italic text-xs text-slate-500'>
            {movie.tagline}
          </p>
          <p className='flex flex-wrap align-baseline text-sm text-neutral-700 my-2'>
            <span className='pr-2'>{CustomizeService.formatTime(movie.runtime)}</span>
            <span className={`px-2 ${CustomizeService.getClassScore(movie.vote_average)}`}>{movie.vote_average.toFixed(1)}</span>
            <span className='px-2'>{releaseDate}</span>
          </p>
          <p className='text-sm my-3'>
            {movie.overview}
          </p>
          <p className='flex flex-wrap items-baseline text-xs mb-4'>
            {
              movie.genres.map((genre) => 
                <span className='bg-slate-100 border-slate-600 text-slate-600 my-1 px-3 mr-4 rounded-full'>{genre.name}</span>
              )
            }
          </p>
          <div className='font-light text-xs flex flex-wrap align-bottom'>
            {budgetTemplate}
            {revenueTemplate}
          </div>
          {homepageTemplate}
        </div>
      </div>
    </div>
      <div className='flex flex-wrap justify-center align-baseline border-t-slate-800 border-t-2 pt-6'>
        {
          movie.production_companies.sort((a, b) => a.name.localeCompare(b.name)).map((company) => 
            <div className='flex flex-wrap flex-col justify-center items-center mx-6 my-2'>
              <img src={TmdbService.getImageFullPath(company.logo_path)} className='max-h-6' />
              <span className='text-xs text-slate-300'>{company.name}</span>
            </div>
          )
        }
      </div>
    </>
  );
};

export default MovieDetailsScreen;
