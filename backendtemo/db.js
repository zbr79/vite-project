const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'rzb', // your MySQL username
    password: '010709', // your MySQL password
    database: 'vite_project'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = connection;
