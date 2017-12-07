var mongoose = require('mongoose')
var User = require('../models/User')
var jwt = require('jsonwebtoken')
var secret = require('../config').secret


exports.requireAdmin = function(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({message: 'Must pass to token to Authorization header'});
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, secret, function(err, user) {
        if (err) throw err;
        User.findById(user._doc._id, function(err, user) {
            if (err)  throw err;
            if (user.userType === 'admin') {
                next()
            } else {
                res.json({message: 'Permission denied'})
            }
        })
    })
}