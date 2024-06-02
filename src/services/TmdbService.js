// src/services/tmdbService.js
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_API_BASE_URL;

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY_READ}`
  }
};

const LANGUAGE = 'language=es-ES';

const TmdbService = {

  async getPopularMovies() {
    try {
      const url = `${BASE_URL}/movie/popular?${LANGUAGE}`;
      const response = await fetch(url, OPTIONS);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  async searchMovies(query) {
    try {
      const response = await fetch(`${BASE_URL}/search/movie?${LANGUAGE}&query=${query}`, OPTIONS);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  getImageFullPath(imgPath){
    return `${process.env.REACT_APP_TMDB_BASE_URL_IMAGE}${imgPath}`;
  }
};

export default TmdbService;
