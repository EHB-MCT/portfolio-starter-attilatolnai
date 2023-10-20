/**
 * Module for handling database connection.
 * @module myDatabase
*/
const mysql = require('mysql');

/**
 * Database connection object.
 * @type {mysql.Connection}
*/
const myDatabase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'wc1',
});

/**
 * Connect to the database.
 * @function
 * @name connect
 * @throws {Error} If connection to the database fails, throws an error.
*/
myDatabase.connect((err) => {
    if (err){
        console.error('Error connecting', err);
    } else {
        console.log('connected')
    }
});

/**
 * Exports the database connection object.
 * @type {mysql.Connection}
 * @exports myDatabase
*/
module.exports = myDatabase;