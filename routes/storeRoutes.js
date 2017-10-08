'use strict';
var auth = require('../auth')();

module.exports = function(app) {
    var Store = require('../controllers/StoreController');

    app.route('/store')
        .get(auth.authenticate(), Store.list_stores)
        .post(Store.create_a_store);

    app.route('/store/:storeID')
        .put(Store.update_a_store)
        .delete(Store.delete_a_store);
}



