const OrderModel = require("../models/orders.model.js");


exports.createOrder = function (order) {
    return OrderModel.create(order);
};

exports.findOrderByUserId = function (user_id) {
    return OrderModel.find({ user_id });
};