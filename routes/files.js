const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const _ = require('lodash');
const Files = mongoose.model('files');
const Privs = mongoose.model('privs');
const {
  ensureAuthenticated
} = require('../helpers/auth');
const router = express.Router();

// Get /files
router.get('/', ensureAuthenticated, (req, res) => {
  if ((req.user.permission == 'admin') || (req.user.permission == 'moderator')) {
    Files.find({}, function(err, files) {
      res.render('files/repo', {
        files: files
      });
    });
  } else {
    res.redirect('/');
  }
});

// Private route for admin
router.get('/private', ensureAuthenticated, (req, res) => {
  if ((req.user.permission == 'admin') || (req.user.permission == 'moderator')) {
    Privs.find({}, function(err, privs) {
      res.render('files/privaterepo', {
        privs: privs
      });
    });
  } else {
    res.redirect('/');
  }
});

// Private route for single user
router.get('/my', ensureAuthenticated, (req, res) => {
  Privs.find({
    sharedTo: {
      '$all': req.user.email
    }
  }, (err, privs) => {
    if (privs.length > 0) {
      res.render('files/my', {
        privs: privs
      });
    } else {
      req.flash('error_msg', 'Nie masz jeszcze prywatnych plików!')
      res.redirect('/dashboard');
    }

  });
});

// Get public /files
router.get('/public', ensureAuthenticated, (req, res) => {
  Files.find({}, function(err, files) {
    res.render('files/publicrepo', {
      files: files
    });
  });

});


// Create public diskStorage
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/public')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});

// Create private diskStorage
var privStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/private')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
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
router.post('/privs', uploadPrivate.single('file-to-upload'), (req, res) => {
  const newPriv = {
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    path: req.file.path,
    size: req.file.size,
    sharedTo: req.body.email

  }
  // Create files
  new Privs(newPriv)
    .save()
    .then(files => {
      res.redirect('/files/privs');
    })
  res.redirect('/files/private');
});


router.use(express.static(path.join(__dirname, 'public')));

// Delete private file
router.delete('/privs/:id', (req, res) => {
  Privs.findOne({
    _id: req.params.id
  }, (err, file) => {
    fs.unlink('public/uploads/private/' + file.originalname, (err) => {
      if (err) throw err;

      Privs.remove({
          _id: req.params.id
        })
        .then(() => {
          req.flash('success_msg', 'Usunięto plik')
          res.redirect('/files/private')
        });
    });
  })
});




// Delete public file
router.delete('/:id', (req, res) => {
  Files.findOne({
    _id: req.params.id
  }, (err, file) => {
    fs.unlink('public/uploads/public/' + file.originalname, (err) => {
      if (err) throw err;
      console.log('Delete file ' + req.params.id);

      Files.remove({
          _id: req.params.id
        })
        .then(() => {
          //  console.log(req.params.id);
          req.flash('success_msg', 'Usunięto plik')
          res.redirect('/files')
        });
    });
  })
});


module.exports = router;
