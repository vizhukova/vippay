var express = require('express');
var router = express.Router();
var config = require('../config');
var CustomerController = require('./../controllers/Customer');
var BasketController = require('./../controllers/Basket');
var BasketProductController = require('./../controllers/BasketProduct');
var ProductController = require('./../controllers/Product');
var UserController = require('./../controllers/User');
var _ = require('lodash');
var Promise = require('bluebird');

/**
 * Закрытие заказа корзины
 */
router.put('/basket/complete', function(req, res, next) {

    BasketController.edit(req.body).then((data) => {

        res.send(data);

    }).catch((err) => {

        next(err);

    })

});

/**
 * Добавление продукта в корзину
 */
router.put('/basket/:product_id', function(req, res, next) {

    var customer;
    var basket;
    var product;
    var user;

    UserController.getByData({login: req.subdomain}).then((u) => {

        user = u[0];

        return ProductController.get({id: req.params.product_id, user_id: user.id});

    }).then((p) => {

            product = p[0];

            if( !product || !product.active || product.special ) throw new Error();

            return CustomerController.get(req.cookies.id)

    }).then((c) => {

        customer = c;

        return new Promise((resolve, reject) => {

             if(! customer) {

                 CustomerController.add({product_id: req.params.product_id}).then((new_customer) => {

                     res.cookie('id', new_customer.id, {maxAge: 9000000000});
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

        return BasketController.get({customer_id: customer.id, client_id: user.id, step: 'pending'});

    }).then((b) => {

        basket = b[0];

        return new Promise((resolve, reject) => {

             if(! basket) {

                 BasketController.add({customer_id: customer.id, client_id: user.id, step: 'pending'}).then((new_basket) => {
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

        return BasketProductController.get({basket_id: basket.id});


    }).then((b_c) => {

        var productFromBC = _.filter(b_c, (item) => item.product.id == product.id) [0];

        if(productFromBC) {
            return BasketProductController.edit({
                                     id: productFromBC.id,
                                     quantity: ++productFromBC.quantity,
                                     total_price: productFromBC.price_per_unit * productFromBC.quantity
                                    })
        } else {
            return BasketProductController.add({
                                     basket_id: basket.id,
                                     product: JSON.stringify(product),
                                     quantity: 1,
                                     price_per_unit: product.price,
                                     total_price: product.price
                                    })
        }

    }).then((b_c) => {

        res.redirect(`http://${user.login}.${req.postdomain}/basket/${basket.id}`);

    }).catch((err) => {

        next(err);

    });

});

/**
 * Получение продуктов корзины
 */
router.get('/basket/product/:basket_id', function(req, res, next) {

    BasketProductController.getWithConvertToBaseCurr(+req.params.basket_id).then((b_p) => {

        res.send(b_p);

    }).catch((err) => {

        next(err);

    })
});

/**
 * Получение корзины по customer_id
 */
router.get('/basket', function(req, res, next) {

    var customer_id = req.query.customer_id || 0;
    var user;

    UserController.getByData({login: req.subdomain}).then((u) => {

        user = u[0];

        return BasketController.get({customer_id: +customer_id, step: 'pending', client_id: user.id})

    }).then((b) => {

        var basket = b[0] || {};
        return BasketProductController.getWithConvertToBaseCurr(basket.id || 0);

    }).then((b_p) => {


        res.send(b_p);

    }).catch((err) => {

        next(err);

    })
});

/**
 * Изменение данных о корзине при оформлении заказа (изменение количества товаров)
 */
router.put('/basket', function(req, res, next) {

    var redirect = `http://${req.clientObj.login}.${req.postdomain}/order/basket/${req.body[0].basket_id}`;

    Promise.map(req.body, (b_p) => {

        var item = _.omit(b_p, ['currency_name']);
        return BasketProductController.edit(item);

    }).then((result) => {
        var a = _.flatten(result)
            var b = redirect
        res.send({products: _.flatten(result), redirect:redirect});

    }).catch((err) => {

        next(err);

    })
});

router.delete('/basket', function(req, res, next) {

    BasketProductController.delete(req.body).then((data) => {

        res.send({});

    }).catch((err) => {

        next(err);

    })

});



module.exports = router;