import PeopleCard from "../cards/PeopleCard";

function PeopleList({ people }) {
  return (
    <div className='flex flex-wrap'>
    {
      (people ?? []).map((actor) => 
        <PeopleCard person={actor} />
      )
    }
  </div>
  );
}

export default PeopleList;