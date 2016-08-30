'use strict';

var Promise = require('bluebird');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');
var CurrencyController = require('../controllers/Currency');
var Rate = require('./../models/Rate');
var _ = require('lodash');
var liqpay_module = require('./liqpay_lib');
var tariffSettings = require('./../modules/tariffSettings');

var config = require('./../config');

var payment = config.get('payment');
var info_domain = config.get('info_domain');

/**
 * Оплата через Liqpay
 */
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
                payment_data.currency = payment.liqpay.currency;
                payment_data.description = products_name.join(' + ');
                payment_data.server_url = `http://payment.${info_domain}/api/payments/liqpay/${order_id}`;
                payment_data.result_url = `http://payment.${info_domain}/success`;

                return UserController.getById(user_id);

            }).then((user) => {

                payment_data.public_key = _.findWhere(user.payment, {name: 'liqpay'}).fields.public_key;

                liqpay = new liqpay_module(payment_data.public_key, _.findWhere(user.payment, {name: 'liqpay'}).fields.private_key);

                return Rate.getSymbol(order.basic_currency_id)

            }).then((data) => {

                payment_data.amount = order.total_price_base_rate;
                payment_data.currency = data.name;

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
            var prices = _.findWhere(tariffSettings[tarrif_name].prices, {time: tarrif_duration});

            var payment_data = {};

                payment_data.version = 3;
                payment_data.order_id = `${user_id}-${tarrif_name}-${tarrif_duration}-`;
                payment_data.action = 'pay';
                payment_data.currency = payment.liqpay.currency;
                payment_data.description = tarrif_name;
                payment_data.server_url = `http://payment.${info_domain}/api/payments/liqpay/${tarrif_name}-${tarrif_duration}-${user_id}`;
                payment_data.result_url = `http://payment.${info_domain}/success`;
                payment_data.amount = prices.price;
                payment_data.public_key = payment.liqpay.public_key;

                var data = liqpay.data_for_form(payment_data);
                resolve(data);

            });
    }

}

module.exports = LiqPay;