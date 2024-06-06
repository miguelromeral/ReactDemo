import React from "react";
import { Route } from "react-router-dom";
import UnAuthGuard from "../guards/UnAuthGuard";
import MovieDetailsScreen from '../components/screens/movies/MovieDetailsScreen';
import SearchShowsScreen from '../components/screens/shows/SearchShowsScreen';
import ShowDetailsScreen from '../components/screens/shows/ShowDetailsScreen';
import NotFoundScreen from '../components/screens/NotFoundScreen';
import PopularMovies from '../components/screens/movies/PopularMoviesScreen';
import SearchMoviesScreen from '../components/screens/movies/search/SearchMoviesScreen';
import PeopleDetailsScreen from "../components/screens/people/PeopleDetailsScreen";
import LoginScreen from "../components/screens/account/LoginScreen";
import SearchPeopleScreen from "../components/screens/people/SearchPeopleScreen";

const UnAuthRoutes = [
  <Route key="ScreenPopularMovies" path="/" element={<UnAuthGuard component={<PopularMovies />} />} />,
  
  <Route key="LoginScreen" path="/login" element={<UnAuthGuard component={<LoginScreen />} />} />,

  <Route key="ScreenSearchPeople" path="/people" element={<UnAuthGuard component={<SearchPeopleScreen />} />} />,

  <Route key="ScreenPeopleDetails" path="/people/:id" element={<UnAuthGuard component={<PeopleDetailsScreen />} />} />,

  <Route key="ScreenSearchShow" path="/shows" element={<UnAuthGuard component={<SearchShowsScreen />} />} />,
    
  <Route key="ScreenShowDetails" path="/show/:id" element={<UnAuthGuard component={<ShowDetailsScreen />} />} />,
    
  <Route key="ScreenSearchMovie" path="/movies" element={<UnAuthGuard component={<SearchMoviesScreen />} />} />,
    
  <Route key="ScreenMovieDetails" path="/movie/:id" element={<UnAuthGuard component={<MovieDetailsScreen />} />} />,
    
  <Route key="ScreenNotFound" path="*" element={<UnAuthGuard component={<NotFoundScreen />} />} />
]

export default UnAuthRoutes;