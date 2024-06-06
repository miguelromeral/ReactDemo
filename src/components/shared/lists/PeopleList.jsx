import MiniPeopleCard from "../cards/MiniPeopleCard";

function PeopleList({ people }) {
  return (
    <div className='flex flex-wrap'>
    {
      (people ?? []).map((actor) => 
        <MiniPeopleCard person={actor} />
      )
    }
  </div>
  );
}

export default PeopleList;