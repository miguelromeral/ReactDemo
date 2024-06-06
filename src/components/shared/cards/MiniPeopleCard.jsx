import TmdbService from '../../../services/TmdbService';

function MiniPeopleCard({person}){
  return <div className='rounded-md overflow-hidden mx-1 my-2 flex flex-col w-24 shadow-md'>
              <img src={TmdbService.getImageFullPath(person.profile_path)} 
                className='h-34'/>
                <div className='mx-1 mt-1 flex flex-col'>
                  <span className='text-slate-700'>{person.character}</span>
                  <span className='text-slate-400 text-xs'>
                    <a href={`/people/${person.id}`}>{person.name}</a></span>
                </div>
            </div>;
}

export default MiniPeopleCard;