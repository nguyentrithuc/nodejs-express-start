'use strict';
var auth = require('../auth')();

module.exports = function(app) {
    var Dish = require('../controllers/DishController')

    // Dish routes
    app.route('/dishes')
        .get(Dish.list_dishes)
        .post(auth.authenticate(),Dish.create_a_dish);

    app.route('/dishes/:dishID')
        .get(Dish.read_a_dish)
        .put(auth.authenticate(),Dish.update_a_dish)
        .delete(auth.authenticate(),Dish.delete_a_dish);
};