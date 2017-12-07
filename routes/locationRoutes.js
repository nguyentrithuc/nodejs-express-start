'use strict';
var auth = require('../auth')()
var admin = require('../helper/admin')
module.exports = function(app) {
    var Location = require('../controllers/LocationController');

    app.route('/location')
        .get(Location.list_locations)
        .post(auth.authenticate(), admin.requireAdmin, Location.create_a_location);

    app.route('/location/:locationID')
        .put(auth.authenticate(), admin.requireAdmin, Location.update_a_location)
        .delete(auth.authenticate(), admin.requireAdmin, Location.delete_a_location);
}