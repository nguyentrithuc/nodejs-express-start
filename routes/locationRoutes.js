'use strict';

module.exports = function(app) {
    var Location = require('../controllers/LocationController');

    app.route('/location')
        .get(Location.list_locations)
        .post(Location.create_a_location);

    app.route('/location/:locationID')
        .put(Location.update_a_location)
        .delete(Location.delete_a_location);
}