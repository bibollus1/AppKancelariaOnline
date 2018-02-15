// Libraries and NPM modules
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load User model
require('./models/users')


// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect(keys.mongoURI)
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err));

// Initialize app
const app = express();


// Route to index page
app.get('/',(req, res)=>{
  res.send('It works!');
});

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global variables
app.use((req, res, next)=>{
  res.locals.user = req.user || null;
  next();
});

// Use routes
app.use('/auth', auth);



// Setting port for heroku or local
const port = process.env.PORT || 3000;
// Listening port
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
