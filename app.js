//changing to get data via api
const API_URL = 'http://localhost:3000/movies';

async function fetchMovies() {
    const response = await fetch(API_URL);
    const movies = await response.json();
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.innerHTML = `
            ${movie.title} (Directed by: ${movie.director}, Year: ${movie.release_year}, Rating: ${movie.rating})
            <button onclick="editMovie(${movie.id})">Edit</button>
            <button onclick="deleteMovie(${movie.id})">Delete</button>
        `;
        movieList.appendChild(movieItem);
    });
}
