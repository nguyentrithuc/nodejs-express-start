'use strict';
var mongoose = require('mongoose')

var StoreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    dishID: {
        type: Array,
        required: false
    },
    gallery:{
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Store', StoreSchema)