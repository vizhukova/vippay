var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/Order');
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');


router.post('/order', function(req, res) {

    ProductController.getCurrentProduct(req.body.id)
        .then(function (product) {

            if(! req.cookies.id) {
                CustomerController.add()
                    .then(function(customer) {

                        OrderController.add(product, customer)
                            .then(function (order) {
                                res.send(order)
                            }).catch(function (err) {
                                res.status(400).send(err);
                            })

                    }).catch(function(err){
                        res.status(400).send(err);
                    });
            } else {
                CustomerController.get(+req.cookies.id)
                    .then(function(customer) {

                        OrderController.add(product, customer)
                            .then(function (order) {
                                res.send(order)
                            }).catch(function (err) {
                                res.status(400).send(err);
                            })

                    }).catch(function(err){
                        res.status(400).send(err);
                    });
            }
            }).catch(function (err) {
                reject(err);
            });

});


module.exports = router;