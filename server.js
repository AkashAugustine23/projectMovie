const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
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

// Routes

// Read all movies from db
app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to fetch movies' });
        }
        res.send(results);
    });
});

// Update a movie
app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, release_year, rating } = req.body;
    const sql = 'UPDATE movies SET title = ?, director = ?, release_year = ?, rating = ? WHERE id = ?';
    db.query(sql, [title, director, release_year, rating, id], (err) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to update movie' });
        }
        res.send({ message: 'Movie updated!' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
