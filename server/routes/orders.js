var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/Order');
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');
var StatisticController = require('../controllers/Statistic');
var email = require('../utils/email');
var _ = require('lodash');

router.get('/orders', function(req, res) {

    OrderController.get(req.clientObj.id).then(function (orders) {
            res.send(orders)
        }).catch(function (err) {
            res.status(400).send(err);
        })

});

router.get('/order/:id', function(req, res) {

    OrderController.getById(req.params.id)
        .then(function (order) {
            res.send(order)
        }).catch(function (err) {
            res.status(400).send(err);
        })

});

router.put('/order/:id', function(req, res) {

    OrderController.setComplete({id:req.params.id, step: req.body.step})
        .then(function (order) {
            res.send(order)
        }).catch(function (err) {
            res.status(400).send(err);
        })

});

router.post('/order', function(req, res) {
    var product;

    ProductController.getWhereIn(req.body.prod_id).then(function(products){
        product  = _.findWhere(products, {id: +req.body.prod_id[0]});
        CustomerController.get(req.cookies.id).then(function(customer) {

            if(! customer) CustomerController.add({product_id: product.id})
                .then(function(customer) {
                    OrderController.add({user_id: req.clientObj.id,
                                        product: product,
                                        products: products,
                                        customer: {id: customer.id, partner_product_id: customer.partner_product_id},
                                        delivery: req.body.delivery,
                                        isPromo: !!req.body.promo.code,
                                        promo_code: req.body.promo.code || null,
                                        discount:  req.body.promo.discount || null})
                        .then(function (order) {

                            var product = _.findWhere(JSON.parse(order.product), {id: +req.body.prod_id[0]});

                            email.send(order.delivery.email,
                                'Успешное оформление заказа',
                                `Спасибо за оформленный заказ. Ссылка на оплату:
                                ${req.subdomain}.${req.postdomain}/order/${product.id}?${order.id}`);

                            StatisticController.add({partner_id: order.partner_id,
                                                    product: product,
                                                    customer_id: order.customer_id,
                                                    client_id: order.client_id,
                                                    action: "start_order"})
                                                    .then(() => {
                                                        res.send(order);
                                                    })

                        }).catch(function (err) {
                            res.status(400).send(err);
                        })
                });
            else OrderController.add({user_id: req.clientObj.id,
                                    product: products,
                                    customer: customer,
                                    delivery: req.body.delivery,
                                    isPromo: !!req.body.promo,
                                    promo_code: req.body.promo ? req.body.promo.code : null,
                                    discount: req.body.promo ? req.body.promo.discount: null})
                        .then(function (order) {

                            email.send(order.delivery.email,
                                'Успешное оформление заказа',
                                `Спасибо за оформленный заказ. Ссылка на оплату:
                                ${req.subdomain}.${req.postdomain}/order/${req.body.prod_id}?${order.id}`);

                            var product = _.findWhere(JSON.parse(order.product), {id: +req.body.prod_id[0]});

                            StatisticController.add({partner_id: order.partner_id,
                                                    product: product,
                                                    customer_id: order.customer_id,
                                                    client_id: order.client_id,
                                                    action: "start_order"})
                                                    .then(() => {
                                                        res.send(order);
                                                    })

                        }).catch(function (err) {
                            res.status(400).send(err);
                        })

        })


    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.put('/order', function(req, res) { //pay for the order

    //OrderController.pay(req.body.id).then((order) => {

        StatisticController.add({partner_id: order[0].partner_id,
                                    product: JSON.stringify(order[0].product),
                                    customer_id: order[0].customer_id,
                                    client_id: order[0].client_id,
                                    action: "pending_order"})
                                    .then(() => {
                                        res.send(order);
                                    }).catch(function(err) {
            res.status(400).send(err.errors)
        })
    //})

});


module.exports = router;