import './App.css';
import NavBar from './components/shared/page/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/shared/page/Footer';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import AuthRoutes from './routes/AuthRoutes';
import UnAuthRoutes from './routes/UnAuthRoutes';

function App() {

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    console.log("Idioma cambiado a..."+lang);
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
              {AuthRoutes}
              {UnAuthRoutes}
            </Routes>
          </Router>
      </div>
      <Footer onLanguageChange={handleLanguageChange}/>
      </div>
    </>
  );
}

export default App;
