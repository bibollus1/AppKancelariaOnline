const express = require('express');
const router = express.Router();
const passport = require('passport')

// Localhost:3000/auth/google
// What we want to request from user during authentication
router.get('/google', passport.authenticate('google',
  {scope: ['profile', 'email']}));

module.exports = router;
