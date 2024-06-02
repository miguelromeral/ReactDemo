import './App.css';
import PopularMovies from './components/PopularMovies';

function App() {

  console.log("API Key: "+process.env.REACT_APP_ENVIRONMENT);

  return (
    <div className="App">
      <div>
        <PopularMovies />
      </div>
    </div>
  );
}

export default App;
