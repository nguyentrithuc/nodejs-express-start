'use strict';
var auth = require('../auth')();
var admin = require('../helper/admin')
module.exports = function(app) {
    var Dish = require('../controllers/DishController')

    // Dish routes
    app.route('/dishes')
        .get(Dish.list_dishes)
        .post(auth.authenticate(), admin.requireAdmin,Dish.create_a_dish);

    app.route('/dishes/:dishID')
        .get(Dish.read_a_dish)
        .put(auth.authenticate(), admin.requireAdmin ,Dish.update_a_dish)
        .delete(auth.authenticate(), admin.requireAdmin,Dish.delete_a_dish);
};