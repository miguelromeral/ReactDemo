import i18n from '../i18n';

// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const BASE_URL = process.env.REACT_APP_TMDB_API_BASE_URL;

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY_READ}`
  }
};

const TmdbService = {

  getSuffixLanguage() {
    return 'language='+i18n.t("tmdb.language");
  },

  async getPopularMovies() {
    try {
      const url = `${BASE_URL}/movie/popular?${this.getSuffixLanguage()}`;
      const response = await fetch(url, OPTIONS);
      console.log(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  async searchMovies(query) {
    try {
      const response = await fetch(`${BASE_URL}/search/movie?${this.getSuffixLanguage()}&query=${query}`, OPTIONS);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  async searchShows(query) {
    try {
      const response = await fetch(`${BASE_URL}/search/tv?${this.getSuffixLanguage()}&query=${query}`, OPTIONS);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching tv shows:', error);
      throw error;
    }
  },

  
  async movieDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}?${this.getSuffixLanguage()}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching movie:', error);
      throw error;
    }
  },


  async getMovieCredits(id){
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}/credits?${this.getSuffixLanguage()}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching show credits:', error);
      throw error;
    }
  },
  
  async showDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/tv/${id}?${this.getSuffixLanguage()}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching show:', error);
      throw error;
    }
  },

  async getShowCredits(id){
    try {
      const response = await fetch(`${BASE_URL}/tv/${id}/credits?${this.getSuffixLanguage()}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching show credits:', error);
      throw error;
    }
  },

  
  async personDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/person/${id}?${this.getSuffixLanguage()}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching person:', error);
      throw error;
    }
  },

  
  async moviesByPerson(id) {
    try {
      const response = await fetch(`${BASE_URL}/person/${id}/movie_credits?${this.getSuffixLanguage()}`, OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error searching person:', error);
      throw error;
    }
  },
  
  async showsByPerson(id) {
    try {
      const response = await fetch(`${BASE_URL}/person/${id}/tv_credits?${this.getSuffixLanguage()}`, OPTIONS);
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
