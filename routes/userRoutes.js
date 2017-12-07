'use strict';
var auth = require('../auth')()
var admin = require('../helper/admin')

module.exports = function(app) {
    var User = require('../controllers/UserController');

    app.route('/add-admin')
        .post(auth.authenticate(), admin.requireAdmin ,User.add_admin);
    app.route('/login')
        .post(User.login);
    app.route('/signup')
        .post(User.signup);
    app.route('/user')
        .get(auth.authenticate(),User.get_user_profile);
    app.route('/user/:username')
        .put(auth.authenticate(), User.edit_user_profile );
}