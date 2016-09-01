'use strict';

var Promise = require('bluebird');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');
var CurrencyController = require('../controllers/Currency');
var Rate = require('./../models/Rate');
var _ = require('lodash');

var config = require('./../config');

var payment = config.get('payment');
var info_domain = config.get('info_domain');

/**
 * Оплата через ЯндексДеньги
 */
class YandexMoney {

    constructor() {

    }


    static getData(order_id, user_id) {

        var payment_data = {};
        var order;

        return new Promise((resolve, reject) => {

            OrderController.getById(order_id).then(function (o) {

                order = o;
                var products_name = order.product.reduce((prev, curr) => `${prev.name}+${curr.name}`);

                payment_data.formcomment = products_name;
                payment_data.label = order_id;
                payment_data.targets = `Заказ № ${order_id}`;
                payment_data['short-dest'] = products_name;
                payment_data['need-fio'] = true;
                payment_data['need-email'] = true;
                payment_data.action = 'https://money.yandex.ru/quickpay/confirm.xml';
                payment_data.successURL = `http://payment.${info_domain}/success`;

                return UserController.getById(user_id);

            }).then((user) => {

                payment_data.receiver = _.findWhere(user.payment, {name: 'yandex'}).fields.receiver;
                
                var product = order.product[0];

                if(product.currency_id !== 4 && order.basic_currency_id !== 4){
                    return Rate.getResult({
                        client_id: order.client_id,
                        from: order.basic_currency_id,
                        to: 4
                    })
                }else{
                    return Promise.resolve({result: 1})
                }

            }).then((data) => {

                var product = order.product[0];

                if(product.currency_id !== 4){
                    payment_data.sum = order.total_price_base_rate * data.result;
                } else {
                    payment_data.sum = order.total_price_order_rate * data.result;
                }


                /*order.product.map((p) => payment_data.sum += +p.price);
                payment_data.sum *= data.result;*/

                resolve(payment_data);
            }).catch((err) => {

                reject(err);

            })

        })

    }


    static getServiceData(user){

        return new Promise((resolve, reject) => {

            var payment_data = {};

                payment_data.formcomment = `${user.id}::start::12`;
                payment_data.label = 'start';
                payment_data.targets = 'Тариф Старт' || '';
                payment_data['short-dest'] = 'Тариф Старт' || '';
                payment_data['need-fio'] = true;
                payment_data['need-email'] = true;
                payment_data.action = 'https://money.yandex.ru/quickpay/confirm.xml';
                payment_data.receiver = payment.yandex.receiver;
                payment_data.sum = 2500;
                payment_data.successURL = `http://payment.${info_domain}/success`;

                resolve(payment_data);

            })

    }

}

module.exports = YandexMoney;