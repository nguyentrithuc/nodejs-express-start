'use strict';
var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Location', LocationSchema);