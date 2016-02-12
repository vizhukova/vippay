'use strict';

var Promise = require('bluebird');
var OrderController = require('../controllers/Order');
var UserController = require('../controllers/User');


class YandexMoney{

    constructor(){

    }


    static getData(order_id, user_id){

        return new Promise((resolve, reject) => {

            var payment_data = {};

            OrderController.getById(order_id).then(function(order){

                payment_data.ik_co_id = '56b498bb3d1eaf37148b4572';
                payment_data.ik_pm_no = order_id;
                payment_data.ik_cur = order.product.currency;
                payment_data.ik_am = order.product.price;
                payment_data.ik_desc = order.product.description;
                payment_data.action = 'https://sci.interkassa.com/';

                return UserController.getById(user_id);

            }).then((user) => {

                //payment_data.ik_co_id = user.payment.interkassa;

                resolve(payment_data);

            }).catch((err) => {

                reject(err);

            })

        })

    }

}

module.exports = YandexMoney;