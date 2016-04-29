'use strict';

var Promise = require('bluebird');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');
var CurrencyController = require('../controllers/Currency');
var Rate = require('./../models/Rate');
var _ = require('lodash');
var liqpay_module = require('./liqpay_lib');



class LiqPay {

    constructor() {

    }


    static getData(order_id, user_id) {

        var payment_data = {};
        var order;
        var liqpay;

        return new Promise((resolve, reject) => {

            OrderController.getById(order_id).then(function (o) {

                order = o;
                var products_name = [];

                order.product.map((p) => {products_name.push(p.name)});

                payment_data.version = 3;
                payment_data.order_id = order_id;
                payment_data.action = 'pay';
                payment_data.currency = 'RUB';
                payment_data.description = products_name.join(' + ');
                payment_data.server_url = 'http://payment.vippay.info/api/payments/liqpay/' + order_id;
                payment_data.result_url = `http://payment.vippay.info/success`;

                return UserController.getById(user_id);

            }).then((user) => {

                payment_data.public_key = _.findWhere(user.payment, {name: 'liqpay'}).fields.public_key;

                liqpay = new liqpay_module(payment_data.public_key, _.findWhere(user.payment, {name: 'liqpay'}).fields.private_key);

                return Rate.getSymbol(order.basic_currency_id)

            }).then((data) => {

                payment_data.amount = order.total_price_base_rate;
                payment_data.currency = data.name;
                /*order.product.map((p) => payment_data.sum += +p.price);
                payment_data.sum *= data.result;*/

                var info = liqpay.data_for_form(payment_data);

                resolve(info);
            }).catch((err) => {

                reject(err);

            })

        })

    }


    static getServiceData(tarrif_name, tarrif_duration, user_id){

        return new Promise((resolve, reject) => {

            var liqpay = new liqpay_module('i71763863612', '3reGyCoxXaaErYed6xa1UV0gzXZ05QHxTghcByHR');

            var payment_data = {};

                payment_data.version = 3;
                payment_data.order_id = `${user_id}-${tarrif_name}-${tarrif_duration}-`;
                payment_data.action = 'pay';
                payment_data.currency = 'RUB';
                payment_data.description = tarrif_name;
                payment_data.server_url = 'http://payment.vippay.info/api/payments/liqpay/' + `${tarrif_name}-${tarrif_duration}-${user_id}`;
                payment_data.result_url = `http://payment.vippay.info/success`;
                payment_data.amount = 5000;
                payment_data.public_key = 'i71763863612';

                resolve(payment_data);

            });

            var data = liqpay.data_for_form(payment_data);

        resolve(data);

    }

}

module.exports = LiqPay;