var mongoose = require('mongoose')

var StoreSchema = new mongoose.Schema({
    title:{
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
    gallery:{
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    }
})

module.exports = StoreSchema