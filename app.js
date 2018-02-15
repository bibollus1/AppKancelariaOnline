// Libraries and NPM modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

const app = express();


// Route to index page
app.get('/',(req, res)=>{
  res.send('It works!');
});

// Use routes
app.use('/auth', auth);

// Setting port for heroku or local
const port = process.env.PORT || 3000;
// Listening port
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
