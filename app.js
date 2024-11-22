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

async function addMovie() {
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const releaseYear = document.getElementById('releaseYear').value;
    const rating = document.getElementById('rating').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, director, release_year: releaseYear, rating }),
    });

    fetchMovies(); // Reload the movie list after adding a new movie
}