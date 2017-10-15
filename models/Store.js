'use strict';
var mongoose = require('mongoose')

var StoreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ownerUser: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    dishID: {
        type: Array,
        required: false
    },
    gallery:{
        type: Array,
        required: false
    },
    logo: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Store', StoreSchema)