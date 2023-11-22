const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const myDatabase = require('./connectToDatabase');
const routes = require('./routes');


//myDatabase.raw("SELECT 1+1")

app.use(bodyparser.json());

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

app.listen(3000, (err) => {
    if(!err) {
        console.log("running on port " + 3000);
    }
    else {
        console.log(err);
    }
})