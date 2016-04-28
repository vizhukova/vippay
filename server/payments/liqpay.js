'use strict';

var Promise = require('bluebird');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');
var CurrencyController = require('../controllers/Currency');
var Rate = require('./../models/Rate');
var _ = require('lodash');
var liqpay_module = require('./liqpay_lib');
var liqpay = new liqpay_module('i54801282901', '55bTuXm3vHSaTAQfs3qRmTubY453pVqyk3ifJr6f');


class LiqPay {

    constructor() {

    }


    static getData(order_id, user_id) {

        var payment_data = {};
        var order;

        return new Promise((resolve, reject) => {

            OrderController.getById(order_id).then(function (o) {

                order = o;
                var products_name = order.product.reduce((prev, curr) => `${prev.name}+${curr.name}`);

                payment_data.version = 3;
                payment_data.order_id = order_id;
                payment_data.action = 'pay';
                payment_data.currency = 'RUB';
                payment_data.description = products_name;
                payment_data.server_url = 'http://payment.vippay.info/api/payments/liqpay/' + order_id;
                payment_data.result_url = `http://payment.vippay.info/success`;

                return UserController.getById(user_id);

            }).then((user) => {

                payment_data.public_key = _.findWhere(user.payment, {name: 'liqpay'}).fields.public_key;

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

                payment_data.amount = order.total_price_base_rate * data.result;
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

            var payment_data = {};

                payment_data.version = 3;
                payment_data.order_id = `${tarrif_name}-${tarrif_duration}-${user_id}`;
                payment_data.action = 'pay';
                payment_data.currency = 'RUB';
                payment_data.description = tarrif_name;
                payment_data.server_url = 'http://payment.vippay.info/api/payments/liqpay/' + `${tarrif_name}-${tarrif_duration}-${user_id}`;
                payment_data.result_url = `http://payment.vippay.info/success`;
                payment_data.amount = 5000;
                payment_data.public_key = 'sdfsdf';

                var data = liqpay.data_for_form(payment_data);

                resolve(data);

            });



    }

}

module.exports = LiqPay;