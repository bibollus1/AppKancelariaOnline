const express = require('express');
const router = express.Router();

// /requests index
router.get('/', (req, res)=>{
  res.render('requests/index')
});

// Add request form
router.get('/add', (req, res)=>{
  res.render('requests/add')
});

router.get('/edit', (req, res)=>{
  res.render('requests/edit')
});

router.get('/show', (req, res)=>{
  res.render('requests/show')
});


module.exports = router;
