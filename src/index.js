const express = require("express");
const app = express();
const mysql = require('mysql');
const bodyparser = require("body-parser");
const myDatabase = require('./connectToDatabase');

app.use(bodyparser.json());

app.get("/", (request, response) => {
    response.send({message: "hello world"})
})

app.get("/users", (req,res)=>{
    const userQuery = 'SELECT * FROM users';

    myDatabase.query(userQuery,(err,result)=>{
        if(err){
            console.error("Error fetching data", err);
            return res.status(500).json({status:'error',message:'Internal Server Error'});
        }
        console.log("Data successfully fetched");
        res.json({status:'success', data:result});
        console.log({data:result});
    })
})

app.listen(3000, (err) => {
    if(!err) {
        console.log("running on port " + 3000);
    }
    else {
        console.log(err);
    }
})