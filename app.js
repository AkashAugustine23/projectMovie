const API_URL = 'http://localhost:3000/movies';

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const movies = await response.json();

        const movieList = document.getElementById('movie-list');
        movieList.innerHTML = ''; // Clear the list before adding new movies

        movies.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.innerHTML = `
                ${movie.title} (Directed by: ${movie.director}, Year: ${movie.release_year}, Rating: ${movie.rating})
                <button onclick="editMovie(${movie.id})">Edit</button>
                <button onclick="deleteMovie(${movie.id})">Delete</button>
            `;
            movieList.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function addMovie() {
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const releaseYear = document.getElementById('releaseYear').value;
    const rating = document.getElementById('rating').value;

    try {
        // Send the data to the server to add a new movie
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, release_year: releaseYear, rating }),
        });

        // Reload the movie list after adding a new movie
        fetchMovies();
    } catch (error) {
        console.error('Error adding movie:', error);
    }
}

async function deleteMovie(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchMovies(); // Refresh movie list
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
}

function showEditForm(id, currentTitle, currentDirector, currentYear, currentRating) {
    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <h3>Edit Movie</h3>
        <input type="text" id="edit-title" value="${currentTitle}" />
        <input type="text" id="edit-director" value="${currentDirector}" />
        <input type="number" id="edit-releaseYear" value="${currentYear}" />
        <input type="number" step="0.1" id="edit-rating" value="${currentRating}" />
        <button onclick="updateMovie(${id})">Save</button>
        <button onclick="cancelEdit()">Cancel</button>
    `;

    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear movie list while editing
    movieList.appendChild(editForm);
}

// Call fetchMovies when the page loads to show the list of movies
document.addEventListener('DOMContentLoaded', fetchMovies);
