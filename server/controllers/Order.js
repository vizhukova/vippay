var Order = require('../models/Order');
var User = require('../models/Users');
var Rate = require('../models/Rate');
var Settings = require('../models/Settings');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {

    get(client_id) {
        return new Promise(function (resolve, reject) {

            Order.get(client_id)
                .then(function (orders) {
                    resolve(orders)
                }).catch(function (err) {
                reject(err);
            });
        })
    },

    setComplete(data) {
        return new Promise(function (resolve, reject) {

            Order.setComplete(data)
                .then(function (order) {
                    resolve(order[0])
                }).catch(function (err) {
                reject(err);
            });
        })
    },

    getById(id) {
        return new Promise(function (resolve, reject) {

            Order.getById(id).then(function (order) {
                resolve(order)
            }).catch(function (err) {
                reject(err);
            });

        })
    },

    add(data) {
        return new Promise(function (resolve, reject) {

            User.getBasicCurrency({user_id: data.product.user_id}).then((result) => {

                    return Rate.getResult({
                        client_id: data.product.user_id,
                        from: data.product.currency_id,
                        to: result.basic_currency
                    }).then((convert) => {

                        data.convert = convert ? convert.result : 1;
                        data.basic_currency_id = result.basic_currency;

                        return Order.add(data)
                            .then(function (order) {
                                resolve(order.attributes)
                            })

                    })

                })
                .catch(function (err) {
                    reject(err);
                });
        })
    },

    pay(id) {
        return new Promise(function (resolve, reject) {

            Order.pay(id)
                .then(function (order) {

                    if (order[0].partner_id) {

                    return Settings.getFee(order[0].client_id).then((obj) => {
                        return User.set({
                            fee_added: obj.fee,
                            id: order[0].client_id
                        }).then((user) => {
                            res.send(order);
                        })
                    })

                }

                }).catch(function (err) {
                reject(err);
            });
        })
    }

};