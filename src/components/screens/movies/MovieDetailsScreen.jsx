import React, { useEffect, useState, useMemo } from "react";
import TmdbService from "../../../services/TmdbService";
import CustomizeService from "../../../services/CustomizeService";
import { useNavigate, useParams } from "react-router-dom";
import {
  BanknotesIcon,
  TicketIcon,
  GlobeAltIcon,
  PhotoIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import ShowDetailsScreen from "../shows/ShowDetailsScreen";
import PeopleList from "../../shared/lists/PeopleList";
import { motion, useScroll } from "framer-motion";
import { useTranslation } from "react-i18next";

const MovieDetailsScreen = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [loading, setLoading] = useState(true);

  const bgImage = useMemo(
    () => TmdbService.getImageFullPath(movie.backdrop_path),
    [movie.id, i18n.language]
  );
  const posterImage = useMemo(
    () => TmdbService.getImageFullPath(movie.poster_path),
    [movie.id, i18n.language]
  );
  const releaseDate = useMemo(
    () => CustomizeService.printDate(movie.release_date),
    [movie.id, i18n.language]
  );

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await TmdbService.movieDetails(id);
        setMovie(data);
        document.title = data.title;
        if (data.success === false) {
          let error_message = "";
          if (data.status_code == 34) {
            error_message = "No hemos encontrado esa película";
          }
          navigate("/error", { state: { error_message: error_message } });
          return;
        }
        setCredits(await TmdbService.getMovieCredits(id));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, [i18n.language]);

  return (
    <>
      <div className={`${movie?.id === undefined ? "animate-pulse" : ""}`}>
          
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%', transform: 'scaleX(0) translateZ(0px)' }} 
        className="h-2 w-full fixed top-10 left-0 right-0 flex flex-nowrap"
      >
        <div className="bg-pink-400 w-full"></div>
      </motion.div>

        <div className="transition-all ease-in-out max-h-36 group hover:max-h-96 overflow-hidden flex justify-center items-center">
          {(movie.backdrop_path && (
            <img src={bgImage} className="transition-all object-cover" />
          )) || (
            <div className="flex items-center justify-center w-full h-36 bg-gray-300 rounded">
              <PhotoIcon className="w-10 h-10 text-gray-200" />
            </div>
          )}
        </div>
        <div className="container px-2 sm:px-auto mx-auto">
          <div className="flex flex-wrap justify-center my-6">
            {(movie.poster_path && (
              <motion.img
                src={posterImage}
                className="h-full w-32 sm:w-64 mx-4 rounded-md shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )) || (
              <div className="flex items-center justify-center w-32 h-48 bg-gray-300 rounded">
                <PhotoIcon className="w-10 h-10 text-gray-200" />
              </div>
            )}
            <div className="flex-1 flex flex-wrap flex-col mx-2">
              {movie.adult && (
                <div className="bg-red-200 border-red-600 text-red-700 p-2 rounded-md mb-2">
                  Adult Content
                </div>
              )}
              <h1 className="text-3xl font-extrabold">
                {movie.title || (
                  <div className="rounded-md h-8 w-full bg-gray-200"></div>
                )}
              </h1>
              <p className="italic text-xs text-slate-500">{movie.tagline}</p>
              <p className="flex flex-wrap align-baseline text-sm text-neutral-700 my-2">
                <div className="pr-2 py-1">
                  {(movie.runtime &&
                    CustomizeService.formatTime(movie.runtime)) || (
                    <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
                  )}
                </div>
                <div
                  className={`mr-2 px-2 py-1 ${CustomizeService.getClassScore(
                    movie.vote_average
                  )}`}
                >
                  {(movie.vote_average && movie.vote_average.toFixed(1)) || (
                    <div className="h-5 w-8 bg-gray-200 rounded-md"></div>
                  )}
                </div>
                <div className="pr-2 py-1">
                  {(movie.release_date && releaseDate) || (
                    <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
                  )}
                </div>
              </p>
              <p className="text-sm my-3">
                {movie.overview || (
                  <p>
                    <div className="h-4 my-2 w-full bg-gray-200 rounded-md"></div>
                    <div className="h-4 my-2 w-full bg-gray-200 rounded-md"></div>
                    <div className="h-4 my-2 w-full bg-gray-200 rounded-md"></div>
                    <div className="h-4 my-2 w-full bg-gray-200 rounded-md"></div>
                    <div className="h-4 my-2 w-1/4 bg-gray-200 rounded-md"></div>
                  </p>
                )}
              </p>
              <p className="flex flex-wrap items-baseline text-xs mb-4">
                {(movie.genres &&
                  movie.genres.map((genre) => (
                    <span className="bg-slate-100 border-slate-600 text-slate-600 my-1 px-3 mr-4 rounded-full">
                      {genre.name}
                    </span>
                  ))) || (
                  <>
                    <span className="h-5 my-1 mr-4 w-20 bg-gray-200 rounded-full"></span>
                    <span className="h-5 my-1 mr-4 w-20 bg-gray-200 rounded-full"></span>
                    <span className="h-5 my-1 mr-4 w-20 bg-gray-200 rounded-full"></span>
                  </>
                )}
              </p>
              <div className="font-light text-xs flex flex-wrap align-bottom">
                {movie.budget > 0 && (
                  <p className="flex flex-nowrap items-center text-red-700">
                    <BanknotesIcon className="h-5 pr-2" />
                    <span>{CustomizeService.printMoney(movie.budget)}</span>
                  </p>
                )}
                {movie.revenue > 0 && (
                  <p className="flex flex-nowrap items-center text-green-700 px-4">
                    <TicketIcon className="h-5 pr-2" />
                    <span>{CustomizeService.printMoney(movie.revenue)}</span>
                  </p>
                )}
              </div>
              {movie.homepage && (
                <div className="my-4">
                  <a href={movie.homepage} target="_blank">
                    <GlobeAltIcon className="h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <PeopleList people={credits.cast} />
        </div>
        <div className="flex flex-wrap justify-center align-baseline border-t-slate-800 border-t-2 pt-6">
          {(movie.production_companies &&
            movie.production_companies
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((company) => (
                <div className="flex flex-wrap flex-col justify-center items-center mx-6 my-2">
                  <img
                    src={TmdbService.getImageFullPath(company.logo_path)}
                    className="max-h-6"
                  />
                  <span className="text-xs text-slate-300">{company.name}</span>
                </div>
              ))) || (
            <>
              <div className="flex flex-wrap justify-center items-center w-1/4 h-20 rounded-md mx-6 my-2 bg-gray-300">
                <BriefcaseIcon className="h-4 w-4 text-gray-200" />
              </div>
              <div className="flex flex-wrap justify-center items-center w-1/4 h-20 rounded-md mx-6 my-2 bg-gray-300">
                <BriefcaseIcon className="h-4 w-4 text-gray-200" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetailsScreen;
