'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const OrderController = require('../controllers/Order');
const UserController = require('../controllers/User');
const CurrencyController = require('../controllers/Currency');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUDoe83NmKxC8byoJA0dn5bgZiyMXP9aJ8VI6kpH8ipEHkpZiDhiOhSWXlR19QfA0pJa-n0TuL231K11',
    'client_secret': 'EHzqivFI1nSB20fmK3-oQmPiB1LAErbbM0Ke7ZoColB8t6eUCvy1dfCsyWtKe_M90yFmZ5wveTxU3EkG'
});


class PayPal {

    static getData(order_id, user_id) {

        return new Promise((resolve, reject) => {

            var payment_data = {};

            CurrencyController.get().then((currency) => {

                return OrderController.getById(order_id).then(function (order) {

                    payment_data.intent = 'sale';

                    payment_data.payer = {
                        payment_method: "paypal"
                    };

                    payment_data.redirect_urls = {
                        "return_url": "http://payment.vippay.info/api/payments/paypal/" + order_id,
                        "cancel_url": "http://cancel.url"
                    };


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

}


var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log(error);
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});

