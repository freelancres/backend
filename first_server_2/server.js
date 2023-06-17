const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouters');

require('dotenv').config();

// create express application 
const server = express();

// use middlewares

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.use("/api/users", userRoutes);

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