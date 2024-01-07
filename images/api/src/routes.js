const express = require('express');
const router = express.Router();
const myDatabase = require('./connectToDatabase');
const {checkName} = require ("./../src/helpers/helpers.js");

/**
 * Get all users.
 * @route GET /api/user
 * @group User - Operations related to users, in this case GET.
 * @returns {Array<object>} 200 - A successfull response returning an array with all users from the table 'user'.
 * @returns {Error} 500 - Internal server error when fetching the data fails.
*/
router.get("/users", async (req, res) =>{
    try {
        const users = await myDatabase('users').select('*');
        res.json({ status: 'success', data: users });
    } catch (error) {
        console.error("Error fetching data", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
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
router.get('/users/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_id;
        const user = await myDatabase('users').where({ user_id: userId }).first();

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.json({ status: 'success', data: user });
    } catch (error) {
        console.error("Error fetching data", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
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
router.post("/users", async (req, res) => {
    try {
        const { user_name, user_email, user_interest } = req.body;
        if(checkName(user_name.name)){
            const [newUserId] = await myDatabase('users').insert({ user_name, user_email, user_interest });
    
            const newUser = await myDatabase('users').where({ user_id: newUserId }).first();
            res.status(201).json({ status: 'success', data: newUser });
        }else{
            res.status(401).send({message: "Name is not formatted correctly"})
        }
    } catch (error) {
        console.error("Error inserting data", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
    /*
    try {
        const { user_name, user_email, user_interest } = req.body;
        const [newUserId] = await myDatabase('users').insert({ user_name, user_email, user_interest });

        const newUser = await myDatabase('users').where({ user_id: newUserId }).first();
        res.status(201).json({ status: 'success', data: newUser });
    } catch (error) {
        console.error("Error inserting data", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
    */
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
router.put("/users/:user_id", async (req, res) => {
    try {
        const userId = req.params.user_id;
        const { user_name, user_email, user_interest } = req.body;

        const updatedUser = await myDatabase('users')
            .where({ user_id: userId })
            .update({ user_name, user_email, user_interest });

        if (updatedUser === 0) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        const newUser = await myDatabase('users').where({ user_id: userId }).first();
        res.json({ status: 'success', data: newUser });
    } catch (error) {
        console.error("Error updating data", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
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
router.delete("/users/:user_id", async (req, res) => {
    try {
        const userId = req.params.user_id;

        const deletedUser = await myDatabase('users').where({ user_id: userId }).del();

        if (deletedUser === 0) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.json({ status: 'success', message: 'Data deleted successfully' });
    } catch (error) {
        console.error("Error deleting data", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
})

/**
 * Express router object for user-related routes.
 * @type {express.Router}
 * @module router
*/
module.exports = router;