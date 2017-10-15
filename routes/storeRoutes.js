'use strict';
var auth = require('../auth')();

module.exports = function(app) {
    var Store = require('../controllers/StoreController');

    app.route('/store')
        .get( Store.list_stores)
        .post(auth.authenticate(),Store.create_a_store);

    app.route('/store/:storeID')
        .get(Store.read_a_store)
        .put(auth.authenticate() ,Store.update_a_store)
        .delete(auth.authenticate() ,Store.delete_a_store);
}



