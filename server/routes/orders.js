var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/Order');
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');
var StatisticController = require('../controllers/Statistic');

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
            StatisticController.add({partner_id: order.partner_id,
                                    product_id: order.product_id,
                                    customer_id: order.customer_id,
                                    client_id: order.client_id,
                                    action: "start_order"});
            res.send(order)
        }).catch(function (err) {
            res.status(400).send(err);
        })
        })


    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.put('/order', function(req, res) {

    OrderController.pay(req.body.id).then(function(order){
        StatisticController.add({partner_id: order[0].partner_id,
                                    product_id: order[0].product_id,
                                    customer_id: order[0].customer_id,
                                    client_id: order[0].client_id,
                                    action: "pending_order"});
        res.send(order);
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});


module.exports = router;