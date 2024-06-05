import './App.css';
import PopularMovies from './components/screens/PopularMoviesScreen';
import NavBar from './components/shared/NavBar';
import SearchMoviesScreen from './components/screens/SearchMoviesScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetailsScreen from './components/screens/MovieDetailsScreen';

function App() {

  console.log("Environment: "+process.env.REACT_APP_ENVIRONMENT);

  return (
    <div className='font-poppins'>
    <NavBar />
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<PopularMovies />} />
            <Route path="/search" element={<SearchMoviesScreen />} />
            <Route path="/details/:id" element={<MovieDetailsScreen />} />
            <Route path="*" element={<SearchMoviesScreen />} />
          </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
