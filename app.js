// Select the movie collection element
const movieCollection = document.getElementById('movieCollection');

// Fetch movies from localStorage (if available)
let movies = JSON.parse(localStorage.getItem('movies')) || [];
let editIndex = null; // To track if a movie is being edited

// Display all movies
function displayMovies() {
  movieCollection.innerHTML = ''; // Clear previous list
  movies.forEach((movie, index) => {
    movieCollection.innerHTML += `
      <li>
        <strong>${movie.title}</strong> by ${movie.director} (${movie.year})
        <button onclick="editMovie(${index})">Edit</button>
        <button onclick="deleteMovie(${index})">Delete</button>
      </li>`;
  });
}
