'use strict';

var mongoose = require('mongoose');
var Dish = require('../models/Dish');

exports.list_dishes = function(req, res) {
    var location_query = req.query.location;
    if (location_query == null) {
        Dish.find({}, function(err, dishes){
            if (err) throw err;
            res.json(dishes);
        });
    } else {
        Dish.find({location: location_query}, function(err, dishes){
            if (err) throw err;
            res.json(dishes);
        });
    }
}

exports.create_a_dish = function(req, res) {
    var new_dish = new Dish(req.body);
    new_dish.save(function(err, dish){
        if (err) throw err;
        res.json(dish);
    });
}

exports.read_a_dish = function(req, res) {
    Dish.findById(req.params.dishID, function(err, dish){
        if (err) throw err;
        res.json(dish);
    })
}

exports.update_a_dish = function(req, res) {
    Dish.findOneAndUpdate({_id: req.params.dishID},req.body, {new: true}, function(err, dish){
        if (err) throw err;
        res.json(dish);
    });
}

exports.delete_a_dish = function(req, res) {
    Dish.remove({_id: req.params.dishID}, function(err, dish){
        if (err) throw err;
        res.json({message: 'Dish successfuly deleted'});
    });
}