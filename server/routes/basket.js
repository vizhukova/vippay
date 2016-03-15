var express = require('express');
var router = express.Router();
var config = require('../config');
var CustomerController = require('./../controllers/Customer');
var BasketController = require('./../controllers/Basket');
var BasketProductController = require('./../controllers/BasketProduct');


router.put('/basket/:product_id', function(req, res) {

    var customer;
    var basket;

    CustomerController.get(req.cookies.id).then((c) => {

        customer = c;

        return new Promise((resolve, reject) => {

             if(! customer) {
                 CustomerController.add({product_id: req.body.params.id}).then((new_customer) => resolve(new_customer));
             } else {
                 resolve(customer);
             }

         })

    }).then((customer) => {

        return BasketController.get({customer_id: customer.id});

    }).then((b) => {

        basket = b[0];

        return new Promise((resolve, reject) => {

             if(! basket) {
                 BasketController.add({customer_id: customer.id}).then((new_basket) => resolve(new_basket.attributes));
             } else {
                 resolve(basket);
             }

         })

    }).then((basket) => {



    }).catch((err) => {

    });

});

module.exports = router;