import './App.css';
import PopularMovies from './components/screens/movies/PopularMoviesScreen';
import NavBar from './components/shared/page/NavBar';
import SearchMoviesScreen from './components/screens/movies/search/SearchMoviesScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetailsScreen from './components/screens/movies/MovieDetailsScreen';
import Footer from './components/shared/page/Footer';
import SearchShowsScreen from './components/screens/shows/SearchShowsScreen';
import ShowDetailsScreen from './components/screens/shows/ShowDetailsScreen';
import NotFoundScreen from './components/screens/NotFoundScreen';
import PeopleDetailsScreen from './components/screens/people/PeopleDetailsScreen';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

function App() {

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  useCallback(() => {
    console.log("Environment: "+process.env.REACT_APP_ENVIRONMENT);
  }, []);

  return (
    <>
      <div className='font-poppins'>
      <NavBar />
      <div className="App bottom-2">
        <Router>
            <Routes>
              <Route path="/" element={<PopularMovies />} />
              <Route path="/shows" element={<SearchShowsScreen />} />
              <Route path="/show/:id" element={<ShowDetailsScreen />} />
              <Route path="/movies" element={<SearchMoviesScreen />} />
              <Route path="/movie/:id" element={<MovieDetailsScreen />} />
              <Route path="/people/:id" element={<PeopleDetailsScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </Router>
      </div>
      <Footer onLanguageChange={handleLanguageChange}/>
      </div>
    </>
  );
}

export default App;
