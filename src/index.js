const express = require("express");
const app = express();
const mysql = require('mysql');
const bodyparser = require("body-parser");
const myDatabase = require('./connectToDatabase');
const routes = require('./routes');

app.use(bodyparser.json());

app.get("/", (request, response) => {
    response.send({message: "hello world"})
})

app.use('/api', routes);

app.listen(3000, (err) => {
    if(!err) {
        console.log("running on port " + 3000);
    }
    else {
        console.log(err);
    }
})