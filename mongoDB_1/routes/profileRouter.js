const express = require('express');
const { check } = require('express-validator');


const { test,
    createProfile } = require(
        "../controllers/profileController"
  );
    

const auth = require('../middleware/auth');
    
const router = express.Router();


/**
 * @private
 * @path /api/profiles/create-profile
 */
router.post(
  "/create-profile",
  [
    auth,
    check("user_id", "User ID is required!").notEmpty(),
    check("bio", "Bio is required!").notEmpty(),
    check("location", "Location is required!").notEmpty(),
  ],
  createProfile
);









/**
 * @path : /api/profiles/test
 * @public
 * @description testing the api
 * 
 */
router.get("/test", test);


module.exports = router;