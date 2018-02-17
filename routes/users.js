const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

//Load user Model
require('../models/users');
const User = mongoose.model('users');

// User login route
router.get('/login', (req, res)=>{
  res.render('users/login');
});

// Login Form POST
router.post('/login', (req, res, next)=>{
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


// User register route
router.get('/register', (req, res)=>{
  res.render('users/register');
});

// Register form POST
router.post('/register', (req,res)=>{
  let errors = [];

  if (req.body.password != req.body.password2){
    errors.push({text:'Password do not match'});
  }

  if (req.body.password.length<4){
    errors.push({text:'Password must be at least 4 characters'})
  }

  if (errors.length>0){
    res.render('users/register',{
      // to not reenter form if fails, it will not clean web storage
      errors: errors,
      firstName: req.body.name,
      lastName: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user =>{
        if(user){
          //req.flash('error_msg', 'Email already registered');
          res.redirect('/users/register');
        } else {
          const newUser = new User ({
            firstName: req.body.name,
            lastName: req.body.lastname,
            email: req.body.email,
            password: req.body.password
          });
          // encrypting a  passowrd
          bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user =>{
                  //req.flash('success_msg', 'You are now registered and can login!')
                  res.redirect('/users/login');
                })
                .catch(err=>{
                  console.log(err);
                  return;
                });
            });
          });
        }
      });

  }
});

// Logout user
router.get('/logout', (req,res)=>{
  req.logout();
  req.flash('success_msg', 'You are loggoed out!');
  res.redirect('/users/login');
});
module.exports = router;