// Select the movie collection element
const movieCollection = document.getElementById('movieCollection');

// To track if a movie is being edited
let editIndex = null; 

// Fetch movies from the backend
async function fetchMovies() {
  try {
    const response = await fetch('/movies'); // API call to get all movies
    const data = await response.json();
    displayMovies(data); // Display the movies fetched from the backend
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

