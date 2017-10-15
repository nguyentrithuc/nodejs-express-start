var mongoose = require('mongoose');
var User = require('../models/User');
var secret = require('../config').secret;
var jwt = require('jsonwebtoken');

exports.signup = function(req, res) {
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
}

exports.login = function(req, res) {
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
          res.json({success: true, token: 'Bearer ' + token});
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
}

exports.get_user_profile = function(req, res, next) {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({message: 'Must pass to token to Authorization header'});
  }
  token = token.replace('Bearer ', '');
  jwt.verify(token,secret, function(err, user) {
    if (err) throw err;
    User.findById(user._doc._id, function(err, user) {
      if (err)  throw err;
      res.json({
        username: user.username
      })
    })
  })
}