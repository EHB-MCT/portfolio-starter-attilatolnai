const express = require("express");

const bodyparser = require("body-parser");
const myDatabase = require('./connectToDatabase');
const routes = require('./routes');

//const knex = require('knex');
//const knexfile = require('./../db/knexfile.js');
//const db = knex(knexfile.development);

//myDatabase.raw("SELECT 1+1")

const app = express();
app.use(bodyparser.json());

//initEndpoints(app, db);

/**
 * Root route that returns a greeting message.
 * @route GET /
 * @group Root - Basic operations
 * @returns {object} 200 - A greeting message for testing purpose.
*/

app.get("/", (request, response) => {
    response.send({message: "hello world"})
})

app.use('/api', routes);

module.exports = app