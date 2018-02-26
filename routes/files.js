const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Files = mongoose.model('files');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Get /files
router.get('/', ensureAuthenticated, (req, res) => {
  if ((req.user.permission=='admin')||(req.user.permission=='moderator')){
  Files.find({}, function(err, files) {
    res.render('files/repo', {files: files});
  });
}else {
  res.redirect('/');
}
});

// Get public /files
router.get('/public', ensureAuthenticated, (req, res) => {
  Files.find({}, function(err, files) {
    res.render('files/publicrepo', {files: files});
  });

});

// Create public diskStorage
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/public')
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname)
  }
});

// Create private diskStorage
var privStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/private')
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname)
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
    path: req.file.path,
    size: req.file.size

  }
  // Create files
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
