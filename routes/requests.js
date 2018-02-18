const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// /requests index
router.get('/', ensureAuthenticated, (req, res)=>{
  res.render('requests/index')
});

// Add request form
router.get('/add', ensureAuthenticated, (req, res)=>{
  res.render('requests/add')
});

router.get('/edit', ensureAuthenticated, (req, res)=>{
  res.render('requests/edit')
});

router.get('/show', ensureAuthenticated, (req, res)=>{
  res.render('requests/show')
});


module.exports = router;
