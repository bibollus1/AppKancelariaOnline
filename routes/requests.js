const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Request = mongoose.model('requests');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');


// /requests index
router.get('/', ensureAuthenticated, (req, res)=>{
  res.render('requests/index')
});

// Add request form
router.get('/add', ensureAuthenticated, (req, res)=>{
  res.render('requests/add')
});

// Edit request form
router.get('/edit', ensureAuthenticated, (req, res)=>{
  res.render('requests/edit')
});
// Show request form
router.get('/show', ensureAuthenticated, (req, res)=>{
  res.render('requests/show')
});

// Process Add request
router.post('/', (req, res)=>{
  const newRequest = {
    title: req.body.title,
    category: req.body.category,
    body: req.body.body,
    user: req.user.id

  }

  // Create request
  new Request(newRequest)
    .save()
    .then(request=>{
      res.redirect('/requests/show/&{request.id}');
    })
});

module.exports = router;
