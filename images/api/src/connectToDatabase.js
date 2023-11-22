/**
 * Module for handling database connection.
 * @module myDatabase
*/
const knex = require('knex');
const config = require('./../db/knexfile');

/**
 * Database connection object.
 * @type {mysql.Connection}
*/
const myDatabase = knex(config);

/**
 * Exports the database connection object.
 * @type {mysql.Connection}
 * @exports myDatabase
*/
module.exports = myDatabase;