const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');


// Defining local strategy
module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    // Check for the users // Match user
    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        return done(null, false, {
          message: 'Nie znaleziono takiego użytkownika'
        });
      }
      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {
            message: 'Nieprawidłowe hasło'
          });
        }
      })
    })
  })),

// Defining google strategy
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // For heroku bug
    }, (accessToken, refreshToken, profile, done) => {

      const image = profile.photos[0].value.substring(0,
      profile.photos[0].value.indexOf('?'));
      // console.log(image);

      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }
      //Check for existing user
      User.findOne({
        googleID: profile.id
      }).then(user => {
        if (user) {
          // Return user
          done(null, user);
        } else {
          // Create user
          new User(newUser)
            .save()
            .then(user => done(null, user))
        }
      });
    })
  );



  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
}

// Niestety nie potrafie dodać logowania przez FB, zostaje ciągle odrzucany przez API, ma być update w marcu, zobaczymy wtedy
// Defining facebook strategy
// passport.use(new FacebookStrategy({
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: '/auth/facebook/callback',
//     proxy: true // For heroku bug
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({
//       facebookId: profile.id
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));
//
