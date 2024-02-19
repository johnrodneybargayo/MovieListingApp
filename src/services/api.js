const API_KEY = 'ed7e3490'; // Replace with your actual API key
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, page = 1, yearFilter = '') => {
  try {
    const url = `${BASE_URL}?s=${searchTerm}&page=${page}&apikey=${API_KEY}&y=${yearFilter}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error; // rethrow the error to be handled by the caller
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const url = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw error; // rethrow the error to be handled by the caller
  }
};
