var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/Order');
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');
var StatisticController = require('../controllers/Statistic');
var UserController = require('../controllers/User');
var PartnerClientsController = require('../controllers/PartnerClients');
var PartnerController = require('../controllers/Partner');
var convert = require('./../modules/convert');
var email = require('../utils/email');
var Promise = require('bluebird');
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


        if(req.body.step == 'complete') {

            OrderController.pay(req.params.id).then((order) => {

                res.send(order);

            }).catch((err) => {

                next(err);

            });

        } else {

             OrderController.cancelPay(req.params.id).then((order) => {

                res.send(order);

            }).catch((err) => {

                next(err);

            });

        }
});

/**
 * Сохранение выбора оплаты
 */
router.put('/order/payments/:id', function(req, res, next) {

    OrderController.edit(req.body).then((order) => {

        res.send(order);

    }).catch((err) => {

        next(err);

    });

});

router.post('/order', function(req, res, next) {

    var product = req.body.product;
    var delivery = {
        comment: req.body.comment,
        email: req.body.email,
        name: req.body.name,
        telephone: req.body.telephone,
        price: req.body.price || 0,
        condition: req.body.condition || null
    };
    var customer;
    var user;
    var total = req.body.total;
    var order;

    if(! _.trim(delivery.email).length
        || ! _.trim(delivery.name).length
        || !_.trim(delivery.telephone).length) {

       throw new Error({mesage: 'error'});
        return;
    }


    Promise.map(product, (p) => {

        return ProductController.getWhereIn(+p.id);

    }).then((arr) => {

        return CustomerController.get(+req.cookies.id || 0);

    }).then((c) => {

        customer = c;

         return new Promise((resolve, reject) => {

             if(! customer) {

                CustomerController.add({product_id: product[0].id}).then((c) =>{

                    c.partner_product_id = JSON.parse(c.partner_product_id);
                    resolve(c);

                }).catch((err) => reject(err));

             } else {
                 resolve(customer);
             }

         })

    }).then((c) => {

        customer = c;

        return UserController.getById(req.clientObj.id);

    }).then((u) => {

        user = u;

        return Promise.map([total, delivery.price], (item) => {
            return convert(item, user.id, product[0].currency_id, user.basic_currency);
        })

    }).then((prices_base_rate) => {

        var partner_id;
        var total_price_base_rate = prices_base_rate[0];
        var delivery_price_base_rate = prices_base_rate[1];

         if(user.partner_fee == 'first') {

             partner_id = customer.partner_product_id.partner_id[0];

         } else {
             partner_id = customer.partner_product_id.partner_id[ customer.partner_product_id.partner_id.length - 1 ];
         }

        return OrderController.add({
                            customer_id: customer.id,
                            product: JSON.stringify(product),
                            delivery: JSON.stringify(delivery),
                            isPromo: !! req.body.promo_code,
                            promo_code: req.body.promo_code || null,
                            discount: req.body.discount || null,
                            partner_id: partner_id,
                            step: req.body.total === 0 ? 'complete' : 'pending',
                            client_id: req.clientObj.id,
                            product_price_order_rate: req.body.total - delivery.price,
                            product_price_base_rate: total_price_base_rate - delivery_price_base_rate,
                            delivery_price_order_rate: delivery.price,
                            delivery_price_base_rate: delivery_price_base_rate,
                            total_price_order_rate: req.body.total,
                            total_price_base_rate: total_price_base_rate,
                            basic_currency_id: user.basic_currency
        })

    }).then((o) => {

        order = o;

        return StatisticController.add({
           order_id: order.id,
           client_id: order.client_id,
           partner_id: order.partner_id,
           customer_id: order.customer_id,
           action: 'start_order',
           product: JSON.stringify(order.product)
        });

    }).then((s) => {

        var redirect;

         email.send(delivery.email, 'Заказ оформлен', `Ваш заказ №${order.id} успешно оформлен. Ссылка на оплату:
         http://${req.clientObj.login}.${req.postdomain}/order/payment/${order.id}`);

        if(order.total_price_order_rate == 0)  {

            redirect = 'http://img.ezinearticles.com/blog/payed-invoice.jpg';

            email.send(delivery.email, 'Заказ оплачен', `Ваш заказ №${order.id} успешно оплачен.`);

        }
        else {

            redirect = `http://${req.clientObj.login}.${req.postdomain}/order/payment/${order.id}`;

        }

        res.send({redirect: redirect});

    }).catch((err) => {

        next(err);

    })
});

router.put('/order', function(req, res, next) {

    StatisticController.add({partner_id: order[0].partner_id,
                                product: JSON.stringify(order[0].product),
                                customer_id: order[0].customer_id,
                                client_id: order[0].client_id,
                                action: "pending_order"})
                                .then(() => {
                                    res.send(order);
                                }).catch(function(err) {
        next(err);
    })

});

/**
 * Получение доступных методов оплаты заказа
 */
router.get('/order/payments/:id', function(req, res, next) {

    var payments;

    UserController.getPayment(req.params.id)
        .then(function (user) {
            payments = _.filter(user.payment, {active: true});
            res.send(payments)
        }).catch(function (err) {
            next(err);
        })

});


module.exports = router;