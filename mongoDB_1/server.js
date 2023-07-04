const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const profileRoutes = require('./routes/profileRouter');

require('dotenv').config();

// create express application 
const server = express();

mongoose.connect(
    "mongodb+srv://safwan:1234@cluster0.cfaq6af.mongodb.net/blogs?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

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


// log the db connection event 'connected or error'
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected')
});

mongoose.connection.on("error", (err) => {
  console.log("Error mongoDB connection", err.message);
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