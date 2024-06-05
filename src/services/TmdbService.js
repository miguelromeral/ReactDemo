// src/services/tmdbService.js
// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_API_BASE_URL;
const LANGUAGE = `language=${process.env.REACT_APP_LANGUAGE}`;

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY_READ}`
  }
};

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

  async searchShows(query) {
    try {
      const response = await fetch(`${BASE_URL}/search/tv?${LANGUAGE}&query=${query}`, OPTIONS);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching tv shows:', error);
      throw error;
    }
  },

  
  async movieDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}?${LANGUAGE}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching movie:', error);
      throw error;
    }
  },


  async getMovieCredits(id){
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}/credits?${LANGUAGE}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching show credits:', error);
      throw error;
    }
  },
  
  async showDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/tv/${id}?${LANGUAGE}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching show:', error);
      throw error;
    }
  },

  async getShowCredits(id){
    try {
      const response = await fetch(`${BASE_URL}/tv/${id}/credits?${LANGUAGE}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching show credits:', error);
      throw error;
    }
  },

  
  async personDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/person/${id}?${LANGUAGE}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching person:', error);
      throw error;
    }
  },

  
  async moviesByPerson(id) {
    try {
      const response = await fetch(`${BASE_URL}/person/${id}/movie_credits?${LANGUAGE}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching person:', error);
      throw error;
    }
  },
  
  async showsByPerson(id) {
    try {
      const response = await fetch(`${BASE_URL}/person/${id}/tv_credits?${LANGUAGE}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching person:', error);
      throw error;
    }
  },


  getImageFullPath(imgPath){
    return `${process.env.REACT_APP_TMDB_BASE_URL_IMAGE}${imgPath}`;
  }
};

export default TmdbService;
