'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');
var CurrencyController = require('../controllers/Currency');


class InterKassa{

    constructor(){

    }


    static getData(order_id, user_id){

        return new Promise((resolve, reject) => {

            var payment_data = {};

            CurrencyController.get().then((currency) => {

                return OrderController.getById(order_id).then(function(order){

                    payment_data.ik_co_id = '57064bad3d1eaf67478b4570';
                    payment_data.ik_pm_no = order_id;
                    payment_data.ik_cur = _.findWhere(currency, {id: order.basic_currency_id}).name;
                    payment_data.ik_am = order.total_price_base_rate;
                    payment_data.ik_desc = order.delivery.description || '';
                    payment_data.ik_ia_u = 'http://payment.vippay.info/api/payments/interkassa';
                    payment_data.ik_ia_m = 'POST';
                    payment_data.action = 'https://sci.interkassa.com/';

                    return UserController.getById(user_id);

                })

            }).then((user) => {

                var interkassa = _.findWhere(user.payment, {name: 'interkassa'});

                payment_data.ik_co_id = interkassa.fields.id_kassa;

                resolve(payment_data);

            }).catch((err) => {

                reject(err);

            })

        })

    }

    static getServiceData(user){

        return new Promise((resolve, reject) => {

            var payment_data = {};

            CurrencyController.get().then((currency) => {

                payment_data.ik_co_id = '57064bad3d1eaf67478b4570';
                payment_data.ik_pm_no = `${user.id}-start-12`;
                payment_data.ik_cur = 'RUB';
                payment_data.ik_am = 2500;
                payment_data.ik_desc = 'Тариф Старт' || '';
                payment_data.ik_ia_u = 'http://payment.vippay.info/api/payments/interkassa';
                payment_data.ik_ia_m = 'POST';
                payment_data.action = 'https://sci.interkassa.com/';

                resolve(payment_data);

            }).catch((err) => {

                reject(err);

            })

        })

    }

}

module.exports = InterKassa;