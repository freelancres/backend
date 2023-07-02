const express = require('express');
const router = express.Router();
const { check} = require('express-validator');

const { signup, signin } = require("../controllers/userController");




/**
 * @path '/signup'
 * @method Post
 * @public
 * @description create new user
 */
router.post(
  "/signup",
  [
    check("username", "Username is required and can not be empty !").notEmpty(),
    check("password", "Password is required and can not be empty !").notEmpty(),
    check("password", "Password must be at least 6 charachters long !!").isLength({min:6}),
  ],
  signup
);


/**
 * @path '/signin'
 * @method Post
 * @public
 * @description sign in user
 */

router.post(
  "/signin",
  [ 
    check("username", "Username is required !").notEmpty(),
    check("password", "Password is required !").notEmpty(),
   
  ],
  signin
);



router.get('/test', (req, res) => {
    res.send('Welcome to user api test');
})


module.exports = router;