'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const OrderController = require('../controllers/Order');
const UserController = require('../controllers/User');
const CurrencyController = require('../controllers/Currency');
const paypal = require('paypal-rest-sdk');

// paypal.configure({
//     'mode': 'sandbox', //sandbox or live
//     'client_id': 'AUDoe83NmKxC8byoJA0dn5bgZiyMXP9aJ8VI6kpH8ipEHkpZiDhiOhSWXlR19QfA0pJa-n0TuL231K11',
//     'client_secret': 'EHzqivFI1nSB20fmK3-oQmPiB1LAErbbM0Ke7ZoColB8t6eUCvy1dfCsyWtKe_M90yFmZ5wveTxU3EkG'
// });


function createTransaction(order, currency){
    let transaction = {};

    transaction.amount = {
        currency: currency,
        total: order.total_price_order_rate
    };

    transaction.item_list = {};
    transaction.item_list.items = order.product.map((p) => {

        return {
            name: p.name,
            sku: p.name,
            price: p.price,
            currency: currency,
            quantity: 1
        }

    });

    return [transaction]

}


class PayPal {

    static getData(order_id, user_id) {

        return new Promise((resolve, reject) => {

            var payment_data = {};
            var cur;

            CurrencyController.get().then((currency) => {

                return OrderController.getById(order_id).then(function (order) {

                    cur = _.findWhere(currency, {id: order.basic_currency_id}).name;

                    payment_data.intent = 'sale';

                    payment_data.payer = {
                        payment_method: "paypal"
                    };

                    payment_data.redirect_urls = {
                        "return_url": "http://payment.vippay.info/api/payments/paypal/" + order_id + "?action=success",
                        "cancel_url": "http://payment.vippay.info/api/payments/paypal/" + order_id + "?action=cancel"
                    };

                    payment_data.transactions = createTransaction(order, cur);

                    return UserController.getById(user_id);

                })

            }).then((user) => {

                var paypal_data = _.findWhere(user.payment, {name: 'paypal'});

                let client_id = paypal_data.fields.client_id;
                let client_secret = paypal_data.fields.client_secret;

		if(!paypal_data.active){resolve({href: ''});return}

                paypal.configure({
                    'mode': 'live',
                    'client_id': client_id,
                    'client_secret': client_secret
                });

                paypal.payment.create(payment_data, function (error, payment) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve({href: payment.links[1].href});
                        console.log("Create Payment Response");
                        console.log(payment);
                    }
                });

            }).catch((err) => {

                reject(err);

            })

        })

    }

}


// var create_payment_json =  {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://return.url",
//         "cancel_url": "http://cancel.url"
//     },
//     "transactions": [{
//         "amount": {
//             "currency": "UAH",
//             "total": "300.00"
//         },
//         "item_list": {
//             "items": [
//                 {
//                     "name": "product1",
//                     "sku": "product1",
//                     "price": "12.00",
//                     "currency": "USD",
//                     "quantity": 1
//                 }
//             ]
//         },
//         "description": "This is the payment description."
//     }]
// }

// paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Create Payment Response");
//         console.log(payment);
//     }
// });

module.exports = PayPal;
