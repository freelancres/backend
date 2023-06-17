const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Read the users file
        const usersData = JSON.parse(fs.readFileSync(usersFilePath));

        // Check if the username is already taken
        if (usersData.find(user => user.username === username)) {
            return res.status(400).json({
                error: 'Username is already taken'
            });
        }

        // Hash the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create a new user object
        const newUser = {
            username,
            password: hashedPassword
        };

        // Add the new user to the users array

        usersData.push(newUser);

        // Save the updated users array to the file

        fs.writeFileSync(usersFilePath, JSON.stringify(usersData));

        res.status(201).json({
            message: 'User created successfully',
        });

    } catch (error) {
        res.status(500).json(
            { error: 'Server Error' }
        );
    }

});

router.get('/test', (req, res) => {
    res.send('Welcome to test');
})


module.exports = router;