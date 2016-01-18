var Order = require('../models/Order');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    get(id) {
        return new Promise(function (resolve, reject) {

            Order.get(id)
                .then(function (orders) {
                resolve(orders)
            }).catch(function (err) {
                reject(err);
            });
        })
    },

    add(data) {
        return new Promise(function (resolve, reject) {

            Order.add(data)
                .then(function (order) {
                resolve(order.attributes)
            }).catch(function (err) {
                reject(err);
            });
        })
    },

    pay(id) {
        return new Promise(function (resolve, reject) {

            Order.pay(id)
                .then(function (order) {
                resolve(order)
            }).catch(function (err) {
                reject(err);
            });
        })
    }

};