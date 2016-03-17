'use strict';

var Promise = require('bluebird');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');
var Rate = require('./../models/Rate');
var _ = require('lodash');


class YandexMoney {

    constructor() {

    }


    static getData(order_id, user_id) {

        var payment_data = {};
        var order;

        return new Promise((resolve, reject) => {

            OrderController.getById(order_id).then(function (o) {

                order = o;

                payment_data.formcomment = order.product[order.product.length - 1].name;
                payment_data.label = order_id;
                payment_data.targets = `Заказ № ${order_id}`;
                payment_data['short-dest'] = order.product[order.product.length - 1].name;
                payment_data['need-fio'] = true;
                payment_data['need-email'] = true;
                payment_data.action = 'https://money.yandex.ru/quickpay/confirm.xml';

                return UserController.getById(user_id);

            }).then((user) => {

                payment_data.receiver = _.findWhere(user.payment, {name: 'yandex'}).fields.receiver;

                if(order.basic_currency_id !== 4){
                    return Rate.getResult({
                        client_id: order.client_id,
                        from: order.basic_currency_id,
                        to: 4
                    })
                }else{
                    return Promise.resolve({result: 1})
                }

            }).then((data) => {

                payment_data.sum = order.total_price_base_rate * data.result;
                /*order.product.map((p) => payment_data.sum += +p.price);
                payment_data.sum *= data.result;*/

                resolve(payment_data);
            }).catch((err) => {

                reject(err);

            })

        })

    }

}

module.exports = YandexMoney;