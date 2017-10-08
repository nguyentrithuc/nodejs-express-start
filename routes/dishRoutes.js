'use strict';

module.exports = function(app) {
    var Dish = require('../controllers/DishController')

    // Dish routes
    app.route('/dishes')
        .get(Dish.list_dishes)
        .post(Dish.create_a_dish);

    app.route('/dishes/:dishID')
        .get(Dish.read_a_dish)
        .put(Dish.update_a_dish)
        .delete(Dish.delete_a_dish);
};