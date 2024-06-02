// src/services/tmdbService.js
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_API_BASE_URL;

const tmdbService = {
  async getPopularMovies() {
    try {
      const url = `${BASE_URL}/movie/popular?language=es-ES&api_key=${API_KEY}`;
      console.log("API: "+url);
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  async searchMovies(query) {
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
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

export default tmdbService;
