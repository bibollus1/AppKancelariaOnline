const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Requests = mongoose.model('requests');
const Users = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/', ensureGuest,(req, res)=>{
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res)=>{
  Requests.find({user:req.user.id})
  .then(requests =>{
    res.render('index/dashboard', {
      requests: requests
    });
  })
  .catch((err)=>{console.log(err);});

});



router.get('/adminpanel', ensureAuthenticated,(req, res)=>{
  if (req.user.permission=='admin'){

    Requests.find({}, function(err, requests) {
               res.render('index/adminpanel', {
                 requests: requests
               });
            });

  } else {
    res.redirect('/');
  }

});

router.get('/admin/reqadmin', ensureAuthenticated,(req, res)=>{
  if (req.user.permission=='admin'){

    Requests.find({}, function(err, requests) {
               res.render('index/admin/reqadmin', {
                 requests: requests
               });
            });

  } else {
    res.redirect('/');
  }
});

router.get('/admin/requsers', ensureAuthenticated,(req, res)=>{
  if (req.user.permission=='admin'){

    Users.find({}, function(err, users) {
               res.render('index/admin/requsers', {
                 users: users
               });
            });

  } else {
    res.redirect('/');
  }

});



router.get('/about',ensureAuthenticated, (req, res)=>{
  res.render('index/about');
});



router.get('/faq', (req, res)=>{
  res.render('index/faq');
});

router.get('/contact', (req, res)=>{
  res.render('index/contact');
});

module.exports = router;
