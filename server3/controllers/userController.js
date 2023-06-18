
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");




const usersFilePath = path.join(__dirname, "..", "data", "users.json");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response}
 * @description Create user api controller
 */
const signup = async (req, res) => {
  try {

    //read validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const { username, password } = req.body;

    // Read the users file
    const usersData = JSON.parse(fs.readFileSync(usersFilePath));

    // Check if the username is already taken
    if (usersData.find((user) => user.username === username)) {
      return res.status(400).json({
        error: "Username is already taken",
      });
    }

    // Hash the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object
    const newUser = {
      user_id: usersData.length + 1 ,
      username,
      password: hashedPassword,
    };

    // Add the new user to the users array

    usersData.push(newUser);

    // Save the updated users array to the file

    fs.writeFileSync(usersFilePath, JSON.stringify(usersData));

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response}
 * @description signin user api controller
 */
const signin = async (req, res) => {
  try {
    //read validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    // Read the users file
    const usersData = JSON.parse(fs.readFileSync(usersFilePath));

    // find the username
    const user = usersData.find((user) => user.username === username);

    // not found user error
    if (!user) {
      return res.status(404).json({
        error: "Invalid username or password",
      });
    }

    // Compare the provided password with stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);

    // wrong password
    if (!validPassword) {
      return res.status(404).json({
        error: "Invalid username or password",
      });
    }

    // correct password
    return res.status(200).json({
      message: "User signed in successfully :) ",
    });
  } catch (error) {
    return res.status(500).json(
      {
        error: "Server error"
      }
    )
  }
}

module.exports = { signup, signin };



