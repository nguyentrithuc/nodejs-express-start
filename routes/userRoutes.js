'use strict';
var auth = require('../auth')();

module.exports = function(app) {
    var User = require('../controllers/UserController');

    app.route('/login')
        .post(User.login);
    app.route('/signup')
        .post(User.signup);
    app.route('/user')
        .get(auth.authenticate(),User.get_user_profile);
    // app.route('/store/:storeID')
        // .put(Store.update_a_store)
        // .delete(Store.delete_a_store);
}



