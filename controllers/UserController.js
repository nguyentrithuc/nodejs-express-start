var mongoose = require('mongoose');
var passport = require('passport');
var secret = require('../config').secret;
var User = require('../models/User');
require('./passport')(passport, User, secret);
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password){
        res.json({success: false, msg: 'Pleas pass username and password'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err){
            if (err){
                return res.json({success: false, msg: 'Username already exist.'});
            }
            res.json({success: true, msg: 'Successful created user '+ req.body.username});
        });
    }
});

router.post('/login', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user, secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
            // res.json(200, {
            //     username: user.username,
            //     password: user.password
            // });
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      };
    });
    
  });

 

  function getToken(headers) {
      if (headers && headers.authorization) {
          var parted = headers.authorization.split(' ');
          if (parted.length === 2) {
              return parted[1];
          } else {
              return null;
          }
      } else {
          return null;
      }
  }

  module.exports = router;