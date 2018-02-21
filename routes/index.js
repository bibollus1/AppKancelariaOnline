const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Requests = mongoose.model('requests');
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

      // Requests.find({}, (err, requests)=>{
      //   var requestMap = {};
      //
      //   requests.forEach((request)=>{
      //     requestMap[request._id] = requests;
      //   });
      //   //res.send(requestMap);
      // })
      // .then(requestMap => {
      //   res.render('index/adminpanel', {
      //     request: requestMap
      //   })
      // });
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
