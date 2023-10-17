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

router.get('/users/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const userQuery = 'SELECT * FROM users WHERE user_id = ?';

    myDatabase.query(userQuery, [userId], (err, result) => {
        if (err){
            console.error("Error fetching data", err);
            return res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }

        if (result.length === 0) {
            return res.status(404).json({status: 'error', message: 'User not found'});
        }

        console.log("Data successfully fetched");
        res.json({status: 'success', data: result[0]});
        console.log({data: result[0]});
    });
});

router.post("/users", (req, res) => {
    const { user_name, user_email, user_interest } = req.body;

    const insertQuery = 'INSERT INTO users (user_name, user_email, user_interest) VALUES (?, ?, ?)';
    myDatabase.query(insertQuery, [user_name, user_email, user_interest], (err, result) => {
        if (err){
            console.error("Error inserting data", err);
            return res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }

        console.log("Data successfully inserted");
        res.json({status: 'success', message: 'Data inserted successfully'});
    })
})

router.put("/users/:user_id", (req, res) => {
    const userId = req.params.user_id;
    const { user_name, user_email, user_interest } = req.body;

    const updateQuery = 'UPDATE users SET user_name = ?, user_email = ?, user_interest = ? WHERE user_id = ?';
    myDatabase.query(updateQuery, [user_name, user_email, user_interest, userId], (err, result) => {
        if (err){
            console.error("Error updating data", err);
            return res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({status: 'error', message: 'User not found'});
        }

        console.log("Data successfully updated");
        res.json({status: 'success', message: 'Data updated successfully'});
    })
})

router.delete("/users/:user_id", (req, res) => {
    const userId = req.params.user_id;

    const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
    myDatabase.query(deleteQuery, [userId], (err, result) => {
        if (err){
            console.error("Error deleting data", err);
            return res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({status: 'error', message: 'User not found'});
        }

        console.log("Data successfully deleted");
        res.json({status: 'success', message: 'Data deleted successfully'});
    })
})

module.exports = router;