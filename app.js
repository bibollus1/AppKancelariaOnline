// Libraries and NPM modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const request = require('request');


// Load models
require('./models/users');
require('./models/request');
require('./models/files');
require('./models/privs');


// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const users = require('./routes/users');
const requests = require('./routes/requests');
const files = require('./routes/files');



// Load Keys
const keys = require('./config/keys');

// Load helpers
const {
  formatDate,
  stripTags,
  select,
  filesize
} = require('./helpers/handlebars');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Initialize app
const app = express();

//Static folder
app.use(express.static(path.join(__dirname, 'public'))); // sets public folder to express static folder
app.use(express.static(path.join(__dirname, 'scripts'))); // sets public folder to express static folder

// Body parser Middleware
app.use(bodyParser.json()); // converting user input into JSON
app.use(bodyParser.urlencoded({
  extended: true
}));

// Method override Middleware
app.use(methodOverride('_method'));

// Handlebars Middleware

app.engine('handlebars', exphbs({
  helpers: {
    stripTags: stripTags,
    formatDate: formatDate,
    select: select,
    filesize: filesize
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Express session
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Flash for messages
app.use(flash());


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.files = req.file || null;
  next();
});

// Flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/users', users);
app.use('/requests', requests);
app.use('/files', files);

// Setting port for heroku or local
const port = process.env.PORT || 3000;
// Listening port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
