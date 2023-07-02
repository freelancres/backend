const express = require('express');

// const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const profileRoutes = require('./routes/profileRouter');

require('dotenv').config();

// create express application 
const server = express();

// use bodyParser middlewares for parsing urlencoded and json

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

//use 'express.json, express.urlencoded' for parsing application/json , application/x-www-form-urlencoded 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/users", userRoutes);
server.use("/api/profiles", profileRoutes);

// general endpoint 

server.get('/', (req, res) => {
    res.send(('<h1>Welcome to Mohammad AlAjoa Home!!!</h1>'));
});

// define PORT

const PORT = process.env.PORT;

// run the server on PORT

server.listen(
    PORT,
    () => console.log(
        `Server is running on port ${PORT}`
    )
);