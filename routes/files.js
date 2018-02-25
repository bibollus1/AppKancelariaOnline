const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('files/repo');
});

router.post('/', upload.single('file-to-upload'), (req, res) => {
  res.redirect('/');
});


module.exports = router;
