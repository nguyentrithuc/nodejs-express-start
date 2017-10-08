'use strict';

var mongoose = require('mongoose');
var Location = require('../models/Location');

exports.list_locations = function(req, res) {
    Location.find({}, function(err, locations){
        if (err) throw err;
        res.json(locations);
    });
}

exports.create_a_location = function(req, res) {
    var new_location = new Location(req.body);
    new_location.save(function(err, location){
        if (err) throw err;
        res.json(location);
    });
}

exports.update_a_location = function(req, res) {
    Location.findOneAndUpdate({_id: req.params.locationID}, req.body, {new: true}, function(err, location){
        if (err) throw err;
        res.json(location);
    });
}

exports.delete_a_location = function(req, res) {
    Location.remove({_id: req.params.locationID}, function(err, location){
        if (err) throw err;
        res.json({message: 'Location successfuly deleted'})
    })
}