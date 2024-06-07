import { useState } from "react";
import TmdbService from "../../../services/TmdbService";
import { UserIcon } from "@heroicons/react/24/outline";

function MiniPeopleCard({ person }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="rounded-md overflow-hidden mx-1 my-2 flex flex-col w-24 shadow-md">
      {
        imageError && 
        <div className="h-34 w-full bg-gray-300 flex flex-row justify-center items-center px-4 py-10">
          <UserIcon className="h-10 w-10 text-gray-500" />
        </div>
        ||
        <img
          src={TmdbService.getImageFullPath(person.profile_path)}
          className="h-34"
          onError={handleImageError}
        />
      }
      <div className="mx-1 mt-1 flex flex-col">
        <span className="text-slate-700">{person.character}</span>
        <span className="text-slate-400 text-xs">
          <a href={`/people/${person.id}`}>{person.name}</a>
        </span>
      </div>
    </div>
  );
}

export default MiniPeopleCard;
