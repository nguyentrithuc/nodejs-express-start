'use strict';

var mongoose = require('mongoose');
var Store = require('../models/Store');

exports.list_stores = function(req, res) {
    var dishID = req.query.dishID;
    if (dishID == null) {
        Store.find({}, function(err, stores){
            if (err) throw err;
            res.json(stores);
        });
    } else {
        Store.find({dishID: dishID}, function(err, stores){
            if (err) throw err;
            res.json(stores);
        });
    }
}

exports.create_a_store = function(req, res) {
    // var token = getToken(req.headers);
    var new_store = new Store(req.body);
    new_store.save(function(err, store){
        if (err) throw err;
        res.json(store);
    });
    //                     if(token) {
    // } else {
    //     return res.status(403).send({success: false, msg: 'Unauthorized.'});
    // }
}

exports.read_a_store = function(req, res) {
    Store.findById(req.params.storeID, function(err, store){
        if (err) throw err;
        res.json(store);
    })
}

exports.update_a_store = function(req, res) {
    Store.findOneAndUpdate({_id: req.params.storeID},req.body, {new: true}, function(err, store){
        if (err) throw err;
        res.json(store);
    });
}

exports.delete_a_store = function(req, res) {
    Store.remove({_id: req.params.storeID}, function(err, store){
        if (err) throw err;
        res.json({message: 'Store successfuly deleted'});
    });
}