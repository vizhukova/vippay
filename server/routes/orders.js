var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/Order');
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');

router.get('/orders', function(req, res) {

    OrderController.get(req.user.id)
        .then(function (orders) {
            res.send(orders)
        }).catch(function (err) {
            res.status(400).send(err);
        })

});

router.post('/order', function(req, res) {

    ProductController.getCurrentProduct(req.body.id).then(function(product){

        CustomerController.get(req.cookies.id).then(function(customer) {
            OrderController.add({user_id: req.user.id,product: product, customer: customer})
        .then(function (order) {
            res.send(order)
        }).catch(function (err) {
            res.status(400).send(err);
        })
        })


    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});


module.exports = router;