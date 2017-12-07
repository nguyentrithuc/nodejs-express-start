var passport = require("passport")  
var passportJWT = require("passport-jwt")
var jwt = require("jsonwebtoken")  
var User = require("./models/User")  
var cfg = require("./config")  
var ExtractJwt = passportJWT.ExtractJwt  
var Strategy = passportJWT.Strategy 
var params = {  
    secretOrKey: cfg.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = function() {  
    var strategy = new Strategy(params, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
        
    };
};

