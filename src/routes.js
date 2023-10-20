const express = require('express');
const router = express.Router();
const myDatabase = require('./connectToDatabase');

/**
 * Get all users.
 * @route GET /api/user
 * @group User - Operations related to users, in this case GET.
 * @returns {Array<object>} 200 - A successfull response returning an array with all users from the table 'user'.
 * @returns {Error} 500 - Internal server error when fetching the data fails.
*/
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

/**
 * Get a user by their ID.
 * @route GET /api/user/{user_id}
 * @group User - Operations related to users, in this case GET by user_id.
 * @param {number} user_id.path.required - The ID of the user you want to get.
 * @returns {object} 200 - A successfull response returning an array with the selected user from the table 'user'.
 * @returns {Error} 404 - When the user_id your trying to get isn't found.
 * @returns {Error} 500 - Internal server error when fetching the data fails.
*/
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

/**
 * Add a new user.
 * @route POST /api/user
 * @group User - Operations related to users, in this case POST.
 * @param {string} user_name.body.required - The name of the user.
 * @param {string} user_school.body.required - The school of the user.
 * @param {string} user_expertLab.body.required - The path in expert lab that the user chose.
 * @returns {object} 201 - The newly created user object.
 * @returns {Error} 400 - Bad request. Invalid input.
 * @returns {Error} 500 - Internal server error.
*/
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

/**
 * Update an existing user.
 * @route PUT /api/user/{user_id}
 * @group User - Operations related to users, in this case PUT.
 * @param {number} user_id.path.required - The ID of the user.
 * @param {string} user_name.body - The updated name of the user.
 * @param {string} user_school.body - The updated school of the user.
 * @param {string} user_expertLab.body - The updated expert lab path of the user.
 * @returns {object} 200 - The updated user object.
 * @returns {Error} 400 - Bad request. Invalid input.
 * @returns {Error} 404 - When the user_id your trying to update isn't found.
 * @returns {Error} 500 - Internal server error.
*/
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

/**
 * Delete a user.
 * @route DELETE /api/user/{user_id}
 * @group User - Operations related to users, in this case DELETE.
 * @param {number} user_id.path.required - The ID of the user.
 * @returns {object} 200 - The deleted user object.
 * @returns {Error} 404 - When the user_id your trying to delete isn't found.
 * @returns {Error} 500 - Internal server error.
*/
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

/**
 * Express router object for user-related routes.
 * @type {express.Router}
 * @module router
*/
module.exports = router;