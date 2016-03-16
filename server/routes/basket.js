var express = require('express');
var router = express.Router();
var config = require('../config');
var CustomerController = require('./../controllers/Customer');
var BasketController = require('./../controllers/Basket');
var BasketProductController = require('./../controllers/BasketProduct');
var ProductController = require('./../controllers/Product');


router.put('/basket/:product_id', function(req, res) {

    var customer;
    var basket;
    var product;

    CustomerController.get(req.cookies.id).then((c) => {

        customer = c;

        return new Promise((resolve, reject) => {

             if(! customer) {

                 CustomerController.add({product_id: req.params.product_id}).then((new_customer) => {
                     resolve(new_customer)
                 }).catch((err) => {
                    reject(err);
                 })

             } else {
                 resolve(customer);
             }

         })

    }).then((c) => {

        customer = c;

        return BasketController.get({customer_id: customer.id});

    }).then((b) => {

        basket = b[0];

        return new Promise((resolve, reject) => {

             if(! basket) {

                 BasketController.add({customer_id: customer.id, step: 'pending'}).then((new_basket) => {
                     resolve(new_basket.attributes)
                 }).catch((err) => {
                     reject(err);
                 })

             } else {
                 resolve(basket);
             }

         })

    }).then((b) => {

        basket = b;

        return ProductController.get({id: req.params.product_id});

    }).then((p) => {

        product = p[0];

        return BasketProductController.add({
                                     basket_id: basket.id,
                                     product: JSON.stringify(product),
                                     quantity: 1,
                                     price_per_unit: product.price,
                                     total_price: product.price
                                    })

    }).then((b_c) => {

        //res.send();
        res.redirect(req.body.redirect_link);

    }).catch((err) => {

        res.status(400).send(err);

    });

});

module.exports = router;