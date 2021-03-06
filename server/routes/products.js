var ProductController = require('../controllers/Product')
var UpsellProductController = require('../controllers/UpsellProduct')
var express = require('express');
var Promise = require('bluebird');
var _ = require('lodash');
var router = express.Router();

/**
 * Получение продуктов по id категории
 */
router.get('/products/:id', function(req, res, next){

    ProductController.getAllProducts(req.params.id).then(function(products){
        res.send(products)
    }).catch(function(err){
        next(err);
    })

});

router.post('/product', function(req, res, next){
    req.body.user_id = req.clientObj.id;
    req.body.isUpsell = !!req.body.upsell_id;
    var new_product = _.omit(req.body, ['upsell_id', 'upsells']);
    new_product.delivery = new_product.delivery ? JSON.stringify(new_product.delivery) : null;
    new_product.materials = new_product.materials && new_product.materials.length ? JSON.stringify(new_product.materials) : null;
    var product;

    new Promise((resolve, reject) => {
        if(! req.body.isUpsell) {
            return ProductController.newProduct(new_product).then((data)=> resolve(data)).catch((err)=> reject(err))
        } else {
            return ProductController.newProductWithUpsell({product: new_product, upsells: req.body.upsells}).then((data)=> resolve(data)).catch((err)=> reject(err))
        }
    }).then((result) => {
        res.send(product);
    }).catch(function(err){
        if(err.code == "22003") err.constraint = 'too_big_value';
        else if(err.code=="22001") err.constraint = "too_long_link";
        next(err);
    })
});

/**
 * Получение продукта по id
 */
router.get('/product/:id', function(req, res, next){

    var product;
    ProductController.getCurrentProduct(req.params.id).then(function(p){
        product = p;
        return UpsellProductController.getUpsells({upsell_id: product.id}).then((upsells) => {
            product.upsells = upsells;
            res.send(product);
        })

    }).catch(function(err){
        res.status(204).send(err.errors)
    })

});

/**
 * Получение id продуктов, относящихся к данному id апселу
 */
router.get('/product/upsell/:id', function(req, res, next){
    UpsellProductController.getUpsells({upsell_id: req.params.id}).then(function(upsells){
        res.send(upsells)
    }).catch(function(err){
        next(err);
    })
});

/**
 *Получение полной информации о продуктах, относящихся к данному id апселу
 */
router.get('/product/upsell_products/:id', function(req, res, next){
    ProductController.get({id: req.params.id}).then((products) => {

        return UpsellProductController.getForUpsell({upsell_id: req.params.id, currency_id: products[0].currency_id}).then(function(upsells){
                res.send(upsells)
            }).catch(function(err){
                next(err);
            })

    }).catch((err) => {
        res.status(400).send(err);
    })
});

/**
 * Получение апселов, относящихся к данному id продукту
 */
router.get('/product/upsells/:id', function(req, res, next){
    UpsellProductController.getForUpsellsProduct({product_id: req.params.id}).then(function(upsells){
        res.send(upsells)
    }).catch(function(err){
        next(err);
    })
});

router.put('/product/:id', function(req, res, next){

    req.body.delivery = req.body.delivery ? JSON.stringify(req.body.delivery) : null;
    req.body.materials = req.body.materials && req.body.materials.length ? JSON.stringify(req.body.materials) : null;

    var product = _.omit(req.body, ['currency_name','upsell_id', 'upsells']);

    ProductController.editProduct(product).then(function(product){
            res.send(product[0])
    }).catch(function(err){
        if(err.code == "22003") err.constraint = 'too_big_value';
        else if(err.code=="22001") err.constraint = "too_long_link";
        next(err);
    })

});

router.delete('/product/:id', function(req, res, next){

    UpsellProductController.getUpsells({product_id: req.params.id}).then((upsellProducts) => {

        if(upsellProducts.length > 0) throw new Error('upsell_product_product_id_foreign');

        return UpsellProductController.remove({upsell_id: req.params.id});

    }).then((upsells) => {

        return ProductController.deleteProduct(req.params.id);

    }).then(function(id){
        res.send(id)
    }).catch(function(err){
        if( !err.constraint) err.constraint = err.message;
        next(err);
    })

});

router.get('/product', function(req, res, next){

    ProductController.get({user_id: req.clientObj.id}).then(function(products){
        res.send(products)
    }).catch(function(err){
        next(err);
    })

});

module.exports = router;
