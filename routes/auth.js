const express = require('express');
const router = express.Router();
const passport = require('passport')

// Localhost:3000/auth/google
// What we want to request from user during authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));




router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

router.get('/verify', (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log('Not auth');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Zostałeś wylogowany!');
  res.redirect('/');
});



module.exports = router;

// router.get('/facebook', passport.authenticate('facebook', {
//   scope: ['profile', 'email']
// }));
// router.get('/facebook',
//   passport.authenticate('facebook'));
//
// router.get('/facebook/callback',
//   passport.authenticate('facebook', {
//     failureRedirect: '/login'
//   }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/dashboard');
//   });
