const mongoose = require('mongoose');
const express = require('express');
const app = express();
const signup = require('./routes/signup');
const login = require('./routes/login');
const blog = require('./routes/blog');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blogging-app')
    .then(() => console.log('connected to database...'))
    .catch(err => console.error('not connected to database...', err));


app.get('/', (req, res) => {
    res.send('Welcome to blogging app.');
})

app.use('/signup', signup);
app.use('/login', login);
app.use('/blog', blog);

const port = 8000;
app.listen(port, () => {
    console.log(`connected to port ${port}...`);
});