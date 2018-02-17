// Libraries and NPM modules
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

// Load User model
require('./models/users')


// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const users = require('./routes/users');



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

// Body parser
app.use(bodyParser.json()); // converting user input into JSON
app.use(bodyParser.urlencoded({extended: true}));

// Handlebars Middleware

app.engine('handlebars',exphbs({
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//
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
app.use('/', index);
app.use('/users', users);



// Setting port for heroku or local
const port = process.env.PORT || 3000;
// Listening port
app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
