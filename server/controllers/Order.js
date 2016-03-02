var Order = require('../models/Order');
var User = require('../models/Users');
var Rate = require('../models/Rate');
var Customer = require('../models/Customer');
var Statistic = require('../models/Statistic');
var Fee = require('../models/Fee');
var Promise = require('bluebird');
var _ = require('lodash');
var email = require('../utils/email');

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
                    return Order.get(order[0].client_id)
                }).then((orders) => {
                resolve(orders);
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

            var order;
            var customer;

            Order.pay(id)
                .then(function (orderObj) {

                    order = orderObj[0];
                    return Customer.get(order.customer_id)

                }).then((c) => {

                var text;
                customer = c;

                if(order.product.material){
                    text = 'Спасибо за оплату заказа. Оплата прошла успешно';
                }else{
                    text = `Спасибо за оплату заказа. Оплата прошла успешно. Ссылка на товар: ${order.product.link_download}`
                }

                email.send(order.delivery.email, 'Успешная оплата заказа', text);

                if (order.partner_id) {
                    return User.get({id: order.client_id})
                } else {
                    resolve(order);
                }

            }).then((user) => {
                var arr = customer.partner_product_id.partner_id;
                var partner_id = user[0].partner_fee == 'first' ? arr[0] : arr[arr.length - 1];

                return Fee.set({
                    fee_added: user[0].fee,
                    client_id: order.client_id,
                    partner_id: partner_id
                })
            }).then((fee) => {
                    Statistic.add({
                        partner_id: order.partner_id,
                        product: JSON.stringify(order.product),
                        customer_id: order.customer_id,
                        client_id: order.client_id,
                        action: "pending_order"
                    }).then(() => {

                        resolve(order);

                    }).catch(function (err) {
                        reject(err)
                    })
                })
                .catch(function (err) {
                    reject(err);
                });
        })
    }

};