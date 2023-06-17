const express = require('express');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');

const app = express();

console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;


app.use(blogRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to  backend!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
