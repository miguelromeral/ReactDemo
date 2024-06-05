import './App.css';
import PopularMovies from './components/screens/PopularMoviesScreen';
import NavBar from './components/shared/NavBar';
import SearchMoviesScreen from './components/screens/SearchMoviesScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetailsScreen from './components/screens/MovieDetailsScreen';
import Footer from './components/shared/Footer';
import SearchShowsScreen from './components/screens/SearchShowsScreen';
import NotFoundScreen from './components/screens/NotFoundScreen';
import ShowDetailsScreen from './components/screens/ShowDetailsScreen';

function App() {

  console.log("Environment: "+process.env.REACT_APP_ENVIRONMENT);

  return (
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
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Router>
    </div>
    <Footer />
    </div>
  );
}

export default App;
