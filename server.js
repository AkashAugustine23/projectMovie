const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

//connecting to my databes in workbench
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: 'akash', 
    database: 'movies_db', 
});