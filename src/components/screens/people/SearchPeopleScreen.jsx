import React, { useEffect, useState, useCallback, useTransition  } from 'react';
import TmdbService from '../../../services/TmdbService';
import SearchForm from '../../shared/forms/SearchForm';
import { useTranslation } from 'react-i18next';
import TemplateCard from '../../shared/cards/TemplateCard';

const SearchPeopleScreen = () => {
  const { t, i18n } = useTranslation();

  const [query, setQuery] = useState('');
  const [people, setPeople] = useState([]);


  const search = async (query) => {
    setQuery(query);
    setPeople(query.length > 0 ?
      await TmdbService.searchPeople(query) :
      []);
  };
  
  useEffect(() => {
    search(query);
  }, [i18n.language]);

  const listPeople = people.sort((a,b) => b.popularity - a.popularity).map((person) => (
      <TemplateCard id={person.id} urlSuffix='people' title={person.name}
      poster={person.profile_path}>
        <div className='flex flex-col'>
          {
            person.known_for.map((kf) => 
              <>
                {kf.name && <a href={`/show/${kf.id}`}>{kf.name}</a>}
                {kf.title && <a href={`/movie/${kf.id}`}>{kf.title}</a>}
              </>
            )
          }
        </div>
      </TemplateCard>
  ));

  const notFound = <div className='flex flex-col items-center'>
    {t('screens.movies.search.not_found')}
  </div>

  return (
    <div class='grid gap-6 mb-6 gird-cols-1 mx-2'>
    <SearchForm 
      label='Buscar Personas'
      placeholder='Nombre de la Persona'
      onChange={search}/>
      <div>
        {
          people.length > 0 ? listPeople : notFound
        }
      </div>
    </div>
  );
};

export default SearchPeopleScreen;
