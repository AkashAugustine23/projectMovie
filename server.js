const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3306;

app.use(cors());
app.use(bodyParser.json());

//connecting to my databes in workbench
const db = mysql.createConnection({
    host: ' 172.26.144.1',
    user: 'root',     
    password: 'akash', 
    database: 'movies_db', 
});

// testing Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// Read all movies from db
app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            return res.status(500).send({ error: 'Failed to fetch movies' });
        }
        res.send(results);
    });
});