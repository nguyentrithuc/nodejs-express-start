var JwtStrategy = require('passport-jwt').Strategy, 
ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport, User, secret){
    var opts = {}; // declare stratey options 
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;
    // Add passport middleware to the app
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
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
    }));
};