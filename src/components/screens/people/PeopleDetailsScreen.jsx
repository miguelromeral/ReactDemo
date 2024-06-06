import React, { useEffect, useState, useMemo } from 'react';
import TmdbService from '../../../services/TmdbService';
import CustomizeService from '../../../services/CustomizeService';
import { useParams } from 'react-router-dom';
import { BanknotesIcon, TicketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import MovieCard from '../../shared/cards/MovieCard';
import ShowCard from '../../shared/cards/ShowCard';
import i18n from '../../../i18n';

const PeopleDetailsScreen = () => {

  const { id } = useParams();
  console.log("Person: "+id);
  const [person, setPerson] = useState({});
  const [movies, setMovies] = useState({});
  const [shows, setShows] = useState({});
  const [loading, setLoading] = useState(true);
  
  const posterImage = useMemo(() => TmdbService.getImageFullPath(person.profile_path), [person.id]);
  const birthday = useMemo(() => CustomizeService.printDate(person.birthday), [person.id]);
  const deathday = useMemo(() => person.deathday ? CustomizeService.printDate(person.deathday) : '', [person.id]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await TmdbService.personDetails(id);
        setPerson(data);
        console.log(data);
        document.title = data.name;
        setMovies(await TmdbService.moviesByPerson(id));
        setShows(await TmdbService.showsByPerson(id));
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

  const adultBanner = person.adult ? 
    <div className='bg-red-200 border-red-600 text-red-700 p-2 rounded-md mb-2'>Adult Content</div> : 
    <></>;

  const homepageTemplate = person.homepage ? 
    <div className='my-4'>
      <a href={person.homepage} target='_blank'>
        <GlobeAltIcon className='h-4'/>
      </a>
    </div>
  : '';

  return (
    <>
    <div className='container mx-auto'>
      <div className='flex flex-wrap justify-center my-6'>
        <img src={posterImage} className='h-full w-32 sm:w-64 mx-4 rounded-md shadow-md' />
        <div className='flex-1 flex flex-wrap flex-col mx-2'>
          { adultBanner }
          <h1 className='text-3xl font-extrabold'>{person.name}</h1>
          <p className='italic text-xs text-slate-500'>
            {person.known_for_department}
          </p>
          <p className='flex flex-wrap align-baseline text-sm text-neutral-700 my-2'>
            <span className=''>{birthday}</span>
            <span className='px-2'>{deathday}</span>
          </p>
          <p className='text-sm my-3'>
            {person.overview}
          </p>
          {/* <p className='flex flex-wrap items-baseline text-xs mb-4'>
            {
              person.genres.map((genre) => 
                <span className='bg-slate-100 border-slate-600 text-slate-600 my-1 px-3 mr-4 rounded-full'>{genre.name}</span>
              )
            }
          </p> */}
          {homepageTemplate}
        </div>
      </div>
      
      <div className='mx-auto'>
        <h1>Películas</h1>
        <div className='h-72 overflow-y-scroll resize-y'>
        {
          person.known_for_department === 'Acting' 
          && movies.cast.sort((a, b) => b.popularity - a.popularity).map((movie) => 
            <MovieCard movie={movie} />
          )
        }
        </div>
      </div>
      <div className='mx-auto'>
        <h1>TV Shows</h1>
        <div className='h-72 overflow-y-scroll resize-y'>
        {
          person.known_for_department === 'Acting' 
          && shows.cast.sort((a, b) => b.popularity - a.popularity).map((show) => 
            <ShowCard show={show} />
          )
        }
        </div>
      </div>
      </div>
    </>
  );
};

export default PeopleDetailsScreen;
