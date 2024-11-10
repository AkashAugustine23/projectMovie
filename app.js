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
// Add or update a movie
function addMovie() {
  const title = document.getElementById('title').value;
  const director = document.getElementById('director').value;
  const year = document.getElementById('year').value;

  if (title && director && year) {
    const newMovie = { title, director, year };
    
    if (editIndex === null) {
      // Add new movie
      movies.push(newMovie);
    } else {
      // Update moviee
      movies[editIndex] = newMovie;
      editIndex = null;
    }

    // Save to localStorage and display updated list
    localStorage.setItem('movies', JSON.stringify(movies));
    displayMovies();

    // Clear form
    document.getElementById('title').value = '';
    document.getElementById('director').value = '';
    document.getElementById('year').value = '';
  } else {
    alert('Please fill in all fields');
  }
}

// Edit a moviee
function editMovie(index) {
  const movie = movies[index];
  
  // Pre-fill already exiting date of that movie
  document.getElementById('title').value = movie.title;
  document.getElementById('director').value = movie.director;
  document.getElementById('year').value = movie.year;

  editIndex = index; // Take note of teh movie being edited
}