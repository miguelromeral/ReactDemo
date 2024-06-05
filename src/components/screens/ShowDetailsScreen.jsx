import React, { useEffect, useState, useMemo } from 'react';
import TmdbService from '../../services/TmdbService';
import CustomizeService from '../../services/CustomizeService';
import { useParams } from 'react-router-dom';
import { BanknotesIcon, TicketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const ShowDetailsScreen = () => {

  const { id } = useParams();

  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(true);

  const bgImage = useMemo(() => TmdbService.getImageFullPath(show.backdrop_path), [show.id]);
  const posterImage = useMemo(() => TmdbService.getImageFullPath(show.poster_path), [show.id]);

  
  const years = useMemo(() => {
    if(!show) return '-';
    const inicio = show.first_air_date?.toString().split("-")[0];
    if(show.status != 'Ended'){
      return `${inicio}-`;
    }
    const final = show.last_air_date?.toString().split("-")[0];
    return `${inicio}-${final}`;
  }, [show.id])



  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await TmdbService.showDetails(id);
        setShow(data);
        console.log(data);
        document.title = data.name;
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const adultBanner = show.adult ? 
    <div className='bg-red-200 border-red-600 text-red-700 p-2 rounded-md mb-2'>Adult Content</div> : 
    <></>;

  const homepageTemplate = show.homepage ? 
    <div className='my-4'>
      <a href={show.homepage} target='_blank'>
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
          <h1 className='text-3xl font-extrabold'>{show.name}</h1>
          <p className='italic text-xs text-slate-500'>
            {show.tagline}
          </p>
          <p className='flex flex-wrap align-baseline text-sm text-neutral-700 my-2'>
            {
              show.episode_run_time.length > 0 &&
              <span className='pr-2'>{CustomizeService.formatTime(show.episode_run_time[0])}</span>
            }
            <span className={`px-2 ${CustomizeService.getClassScore(show.vote_average)}`}>{show.vote_average.toFixed(1)}</span>
            <span className='px-2'>{years}</span>
          </p>
          
          <p className='flex flex-row text-xs'>
            <span className='px-3 mr-4 text-slate-100 bg-slate-800 rounded-full'>{show.number_of_seasons} Temporadas</span>
            <span className='px-3 mr-4 text-slate-100 bg-slate-800 rounded-full'>{show.number_of_episodes} Episodios</span>
          </p>
          <p className='text-sm my-3'>
            {show.overview}
          </p>
          <p className='flex flex-wrap items-baseline text-xs mb-4'>
            {
              show.genres.map((genre) => 
                <span className='bg-slate-100 border-slate-600 text-slate-600 my-1 px-3 mr-4 rounded-full'>{genre.name}</span>
              )
            }
          </p>
          {homepageTemplate}
        </div>
      </div>
    </div>
      <div className='flex flex-wrap justify-center align-baseline border-t-slate-800 border-t-2 pt-6'>
        {
          show.production_companies.sort((a, b) => a.name.localeCompare(b.name)).map((company) => 
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

export default ShowDetailsScreen;
