'use strict';

var Promise = require('bluebird');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');
var Rate = require('./../models/Rate');


class YandexMoney {

    constructor() {

    }


    static getData(order_id, user_id) {

        return new Promise((resolve, reject) => {

            var payment_data = {};
            var order;

            OrderController.getById(order_id).then(function (o) {

                order = o;

                payment_data.formcomment = order.product.description;
                payment_data.label = order_id;
                payment_data.targets = `Заказ № ${order_id}`;
                payment_data['short-dest'] = order.product.description;
                payment_data['need-fio'] = true;
                payment_data['need-email'] = true;
                payment_data.action = 'https://money.yandex.ru/quickpay/confirm.xml';

                return UserController.getById(user_id);

            }).then((user) => {

                payment_data.receiver = user.payment.yandex.receiver;

                return Rate.getResult({
                    client_id: order.client_id,
                    from: order.product.currency_id,
                    to: 4
                })


            }).then((data) => {

                payment_data.sum = order.product.price * data.result;

                resolve(payment_data);
            }).catch((err) => {

                reject(err);

            })

        })

    }

}

module.exports = YandexMoney;