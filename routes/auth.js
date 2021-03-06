const express = require('express');
const router = express.Router();
const passport = require('passport')

// Localhost:3000/auth/google
// What we want to request from user during authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));



//  Google authenticate
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

// Veryfiy user
router.get('/verify', (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log('Not auth');
  }
});

// Logout from google
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Zostałeś wylogowany!');
  res.redirect('/');
});



module.exports = router;
