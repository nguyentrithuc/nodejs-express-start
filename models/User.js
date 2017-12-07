var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    currentCity: {
        type: String,
        required: false
    },
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash){
                if (err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    } 
});

UserSchema.methods.comparePassword = function (password, callback){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
}

// Remember to export the model
module.exports = mongoose.model('User', UserSchema);