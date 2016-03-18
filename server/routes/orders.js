var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/Order');
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');
var StatisticController = require('../controllers/Statistic');
var UserController = require('../controllers/User');
var email = require('../utils/email');
var _ = require('lodash');

router.get('/orders', function(req, res, next) {

    OrderController.get(req.clientObj.id).then(function (orders) {
            res.send(orders)
        }).catch(function (err) {
            //res.status(400).send(err);
            next(err);
        })

});

router.get('/order/:id', function(req, res, next) {

    OrderController.getById(req.params.id)
        .then(function (order) {
            res.send(order)
        }).catch(function (err) {
            //res.status(400).send(err);
            next(err);
        })

});

router.put('/order/:id', function(req, res, next) {

        new Promise((resolve, reject) => {

            if(req.body.step) return  OrderController.setComplete({id:req.params.id, step: req.body.step}).then((order) => resolve(order));
            else return OrderController.edit(req.body).then((order) => resolve(order));

        }).then(function (order) {
            res.send(order[0]);
        }).catch(function (err) {
            //res.status(400).send(err);
            next(err);
        })

});

router.post('/order', function(req, res, next) {
    var product;
    var order;

    ProductController.getWhereIn(req.body.prod_id).then(function(products){
        product  = _.findWhere(products, {id: +req.body.prod_id[0]});
        return CustomerController.get(req.cookies.id).then(function(customer) {

            if(! customer) return CustomerController.add({product_id: product.id})
                .then(function(customer) {
                    return OrderController.add({user_id: req.clientObj.id,
                                        product: product,
                                        products: products,
                                        customer: {id: customer.id, partner_product_id: customer.partner_product_id},
                                        delivery: req.body.delivery,
                                        isPromo: !!req.body.promo.code,
                                        promo_code: req.body.promo.code || null,
                                        discount:  req.body.promo.discount || null})

                });
            else return OrderController.add({user_id: req.clientObj.id,
                                    product: products,
                                    customer: customer,
                                    delivery: req.body.delivery,
                                    isPromo: !!req.body.promo,
                                    promo_code: req.body.promo ? req.body.promo.code : null,
                                    discount: req.body.promo ? req.body.promo.discount: null})

        })


    }) .then(function (o) {
        order = o;
        var product = _.findWhere(JSON.parse(order.product), {id: +req.body.prod_id[0]});
        if(order.total_price_order_rate == 0) {
            return OrderController.pay(order.id).then((payed_order) => {
               order = payed_order;
            });
        } else {
             email.send(order.delivery.email,
            'Успешное оформление заказа',
            `Спасибо за оформленный заказ. Ссылка на оплату:
            ${req.subdomain}.${req.postdomain}/order/${product.id}?${order.id}`);

        return StatisticController.add({partner_id: order.partner_id,
            product: product,
            customer_id: order.customer_id,
            client_id: order.client_id,
            action: "start_order"})
        }

    }).then(() => {
        res.send(order);
    }).catch(function(err){
        //res.status(400).send(err.errors)
        next(err);
    })

});

router.put('/order', function(req, res, next) { //pay for the order

    //OrderController.pay(req.body.id).then((order) => {

        StatisticController.add({partner_id: order[0].partner_id,
                                    product: JSON.stringify(order[0].product),
                                    customer_id: order[0].customer_id,
                                    client_id: order[0].client_id,
                                    action: "pending_order"})
                                    .then(() => {
                                        res.send(order);
                                    }).catch(function(err) {
           // res.status(400).send(err.errors)
            next(err);
        })
    //})

});

router.get('/order/payments/:id', function(req, res, next) {

    var payments;

    UserController.getPayment(req.params.id)
        .then(function (user) {
            payments = _.filter(user.payment, {active: true});
            res.send(payments)
        }).catch(function (err) {
            //res.status(400).send(err);
            next(err);
        })

});


module.exports = router;