import './App.css';
import PopularMovies from './components/PopularMovies';
import SearchMoviesScreen from './components/screens/SearchMoviesScreen';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

  console.log("API Key: "+process.env.REACT_APP_ENVIRONMENT);

  return (
    <>
    <nav>
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/search">Buscar</a>
        </li>
      </ul>
    </nav>
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<PopularMovies />} />
            <Route path="/search" element={<SearchMoviesScreen />} />
            <Route path="*" element={<SearchMoviesScreen />} />
          </Routes>
        </Router>
    </div>
    </>
  );
}

export default App;
