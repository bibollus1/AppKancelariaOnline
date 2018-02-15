const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

// Defining strategy
module.exports = function (passport){
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:'/auth/google/callback',
      proxy: true // For heroku bug
    }, (accessToken, refreshToken, profile, done)=>{
      console.log(accessToken);
      console.log(profile);
    })
  )
}
