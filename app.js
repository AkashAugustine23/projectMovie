const API_URL = 'http://localhost:3000/movies';

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const movies = await response.json();
        const movieList = document.getElementById('movie-list');
        movieList.innerHTML = ''; // Clear the movie list

        movies.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.innerHTML = `
                ${movie.title} (Directed by: ${movie.director}, Year: ${movie.release_year}, Rating: ${movie.rating})
                <button class="delete-btn" onclick="deleteMovie(${movie.id})">Delete</button>
                <button class="edit-btn" onclick="showEditForm(${movie.id}, '${escapeString(movie.title)}', '${escapeString(movie.director)}', ${movie.release_year}, ${movie.rating})">Edit</button>
            `;
            movieList.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Escape strings to handle quotes properly
function escapeString(str) {
    return str ? str.replace(/'/g, "\\'") : ''; // Escape single quotes and handle null/undefined
}

async function addMovie() {
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const releaseYear = document.getElementById('releaseYear').value;
    const rating = document.getElementById('rating').value;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, release_year: releaseYear, rating }),
        });
        fetchMovies(); // Refresh movie list
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
    editForm.id = 'edit-form';
    editForm.innerHTML = `
        <h3>Edit Movie</h3>
        <input type="text" id="edit-title" value="${currentTitle}" />
        <input type="text" id="edit-director" value="${currentDirector}" />
        <input type="number" id="edit-releaseYear" value="${currentYear}" />
        <input type="number" step="0.1" id="edit-rating" value="${currentRating}" />
        <button onclick="updateMovie(${id})">Save</button>
        <button class="cancel-btn" onclick="cancelEdit()">Cancel</button>
    `;

    // Add the edit form to the DOM
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear movie list while editing
    movieList.appendChild(editForm);
}

function cancelEdit() {
    fetchMovies(); // Reload the movie list without making changes
}

async function updateMovie(id) {
    const title = document.getElementById('edit-title').value;
    const director = document.getElementById('edit-director').value;
    const releaseYear = document.getElementById('edit-releaseYear').value;
    const rating = document.getElementById('edit-rating').value;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, release_year: releaseYear, rating }),
        });
        fetchMovies(); // Refresh movie list
    } catch (error) {
        console.error('Error updating movie:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies(); // Fetch and display movies when the page is loaded
});
