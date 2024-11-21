const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3306;

//connecting to my databes in workbench
const db = mysql.createConnection({
    host: '192.168.0.54',
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