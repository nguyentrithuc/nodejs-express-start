var mongoose = require('mongoose')

var DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    gallery: {
        type: Array,
        required: false,
    },
    content: {
        type: String,
        required: true,
    }
})

DishSchema.method.getGallery = function() {
    return this.gallery.map(function(picture){
        return "media hosting url" + picture
    })
}

module.exports = DishSchema