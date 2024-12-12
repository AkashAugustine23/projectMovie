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

    // Check for missing required fields
    if (!title || !director || !release_year || !rating) {
        return res.status(400).send({ 
            error: 'All fields (title, director, release_year, rating) are required' 
        });
    }
    
    // If validation passes, proceed to insert the movie
    const sql = 'INSERT INTO movies (title, director, release_year, rating) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, director, release_year, rating], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to add movie' });
        }
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

// Update a movie
app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, release_year, rating } = req.body;
    const sql = 'UPDATE movies SET title = ?, director = ?, release_year = ?, rating = ? WHERE id = ?';
    db.query(sql, [title, director, release_year, rating, id], () => {
        res.send({ message: 'Movie updated!' });
    });
});

// Delete a movie
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM movies WHERE id = ?';
    db.query(sql, [id], () => {
        res.send({ message: 'Movie deleted!' });
    });
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).send({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const startServer = () => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            console.log(`Server running on http://localhost:${server.address().port}`); // Log the dynamically assigned port
            resolve(server);  // Resolve the server once it has started
        });
        server.on('error', reject);  // Reject if there's an error starting the server
    });
};

const stopServer = (server) => {
    return new Promise((resolve, reject) => {
        if (server) {
            server.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } else {
            reject(new Error('Server not initialized.'));
        }
    });
};

module.exports = { app, startServer, stopServer };