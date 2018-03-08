const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Request = mongoose.model('requests');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');


// /requests index
router.get('/', ensureAuthenticated, (req, res)=>{
  res.render('requests/index');
});

// Add request form
router.get('/add', ensureAuthenticated, (req, res)=>{
  res.render('requests/add');
});

// Edit request form
router.get('/edit/:id', ensureAuthenticated, (req, res)=>{

  Request.findOne({
    _id: req.params.id
  })
  .then(request => {
    res.render('requests/edit', {
      request: request
    })
  });
});

// Show request form
router.get('/show/:id', ensureAuthenticated, (req, res)=>{
  Request.findOne({
    _id: req.params.id
  })
  .then(request => {
    res.render('requests/show', {
      request: request
    })
  });

});

// Process Add request
router.post('/', (req, res)=>{
  const newRequest = {
    title: req.body.title,
    category: req.body.category,
    status: req.body.status,
    body: req.body.body,
    user: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName

  }
  // Create request
  new Request(newRequest)
    .save()
    .then(request=>{
      res.redirect('/dashboard');
    })
});

// Edit Form Process
router.put('/:id',(req,res)=>{
  Request.findOne({
    _id: req.params.id
  })
  .then(request => {
    request.title = req.body.title,
    request.body = req.body.body,
    request.status = req.body.status,
    request.category = req.body.category

    request.save()
      .then(request => {
        req.flash('success_msg', 'Edytowano zgłoszenie.')
        res.redirect('/dashboard');
      });
  });
});

// Change status
router.post('/:id',(req,res)=>{
  Request.findOne({
    _id: req.params.id
  })
  .then(request => {
    request.status = req.body.status,
    request.save()
      .then(request => {
        req.flash('success_msg', 'Zmieniono status.');
        res.redirect('/admin/reqadmin');
      });
  });
});

// Delete Request
router.delete('/:id',(req,res)=>{
  Request.remove({_id: req.params.id})
    .then(()=>{
      req.flash('success_msg', 'Usunięto zgłoszenie')
      res.redirect('/admin/reqadmin')
    });
});

// Add update
router.post('/update/:id', (req,res)=>{
  Request.findOne({
    _id: req.params.id
  })
  .then(request => {
    const newUpdate = {
      updateBody: req.body.updateBody,
      updateUser: req.user.id,
      updateFirstName: req.user.firstName,
      updateLastName: req.user.lastName,
    }
    // Add to comments array
    request.updates.unshift(newUpdate);

    request.save()
      .then(request=>{
        res.redirect(`/requests/show/${request.id}`)
      });
  });
});

module.exports = router;
