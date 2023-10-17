const express = require('express');
const router = express.Router();
const myDatabase = require('./connectToDatabase');

router.get("/users", (req, res) =>{
    const userQuery = 'SELECT * FROM users';

    myDatabase.query(userQuery, (err, result) => {
        if (err){
            console.error("Error fetching data", err);
            return res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }

        console.log("Data successfully fetched");
        res.json({status: 'success', data:result});
        console.log({data:result});
    })
})

module.exports = router;