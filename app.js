// Select the movie collection element
const movieCollection = document.getElementById('movieCollection');

// Fetch movies from localStorage (if available)
let movies = JSON.parse(localStorage.getItem('movies')) || [];
let editIndex = null; // To track if a movie is being edited


// Add a new movie or update an existing one
function addMovie() {
  const title = document.getElementById('title').value;
  const director = document.getElementById('director').value;
  const year = document.getElementById('year').value;

  if (title && director && year) {
    const newMovie = { title, director, year };
    
    if (editIndex === null) {
      // Adding a new movie
      movies.push(newMovie);
    } else {
      // Updating an existing movie
      movies[editIndex] = newMovie;
      editIndex = null;
    }


