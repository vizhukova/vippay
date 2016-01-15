var Order = require('../models/Order');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    add(product, customer) {
        return new Promise(function (resolve, reject) {

            Order.add(product, customer)
                .then(function (order) {
                resolve(order.attributes)
            }).catch(function (err) {
                reject(err);
            });
        })
    }

};