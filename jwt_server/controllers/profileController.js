
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");


const profilesFilePath = path.join(__dirname, "..", "data", "profiles.json");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response}
 * @description creating user profile api controller
 */
const createProfile = async (req, res) => {
try {
  //read validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { user_id, bio, location } = req.body;

  // Read profilesData from prifiles.json file

  const profilesData = JSON.parse(fs.readFileSync(profilesFilePath));

  // Check if the profile already exists for this user
  if (profilesData.find((profile) => profile.user_id === user_id)) {
    return res.status(400).json({
      error: "Profile already exists for this user !!!",
    });
  }

  // Create new profile
  const newProfile = {
    user_id,
    bio,
    location,
  };

  // Add the newProfile to profiles array
  profilesData.push(newProfile);

  // Save the updated profilesData to the profiles.json file
    
    fs.writeFileSync(profilesFilePath, JSON.stringify(profilesData));

  // return success response
    return res.status(201).json({
        message: 'Profiles created successfully :) '
    })
    

} catch (error) {
    return res
        .status(500)
        .json({
            error: "Server Error"
        });
    
}
}





/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response}
 * @description Test profiles api
 */
const test = (req, res) => {
  return res.send("Welcome to profile api test");
};

module.exports = { test, createProfile };