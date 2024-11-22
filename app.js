//changing to get data via api
const API_URL = 'http://localhost:3000/movies';

async function fetchMovies() {
    const response = await fetch(API_URL);
    const movies = await response.json();
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';