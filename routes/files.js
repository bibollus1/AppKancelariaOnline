const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Files = mongoose.model('files');

const router = express.Router();

// Get /files
router.get('/', (req, res) => {
  Files.find({}, function(err, files) {
    res.render('files/repo', {files: files});
  });
});

// Create public diskStorage
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/public')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Create private diskStorage
var privStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/private')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Load multer storages
const uploadPublic = multer({
  storage: storage
});
const uploadPrivate = multer({
  storage: privStorage
});

// Post form for public folder
router.post('/', uploadPublic.single('file-to-upload'), (req, res) => {
  const newFile = {
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    path: Date.now() + '-' + req.file.originalname

  }
  // Create request
  new Files(newFile)
    .save()
    .then(files => {
      res.redirect('/files');
    })
  //res.redirect('/');
});

// Post form for private folder
router.post('/private', uploadPrivate.single('file-to-upload'), (req, res) => {
  res.redirect('/');
});

module.exports = router;
