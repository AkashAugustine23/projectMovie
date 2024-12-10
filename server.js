const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross origin request
app.use(bodyParser.json());

// MySQL connection using pool
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'akash',
    database: 'movies_db',
});

// Testing the database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
    connection.release(); // Releasing connection back to pool
});

// Create a movie
app.post('/movies', (req, res) => {
    const { title, director, release_year, rating } = req.body;
    const sql = 'INSERT INTO movies (title, director, release_year, rating) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, director, release_year, rating], (err, result) => {
        res.send({ message: 'Movie added!', movieId: result.insertId });
    });
});

// Read all movies from db
app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, results) => {
        res.send(results);
    });
});
// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
