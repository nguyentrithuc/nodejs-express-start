'use strict';
var mongoose = require('mongoose')

var DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    location: {
        required: true,
        type: Array,
    },
    classify: {
        required: false,
        type: Object,
    },
    image: {
        type: String,
        required: false,
    },
    gallery: {
        type: Array,
        required: false,
    },
    content: {
        type: String,
        required: false,
    }
})

// DishSchema.method.getGallery = function() {
//     return this.gallery.map(function(picture){
//         return "media hosting url" + picture
//     })
// }

module.exports = mongoose.model('Dish',DishSchema)