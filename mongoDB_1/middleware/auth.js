const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        //Extract the token from Authorization header
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            res.status(401).json({message: "Access Denied !!"})
        }

        // Split the header value by space and get the token
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        
        //adding a user to the request object
        req.user = decoded.user;

        next();    
    } catch (error) {
        res.status(401).json({
          message: "Token is Invalid !!!",
        });
    }
}