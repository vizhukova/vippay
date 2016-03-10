var ProductController = require('../controllers/Product')
var UpsellProductController = require('../controllers/UpsellProduct')
var express = require('express');
var Promise = require('bluebird');
var _ = require('lodash');
var router = express.Router();

router.get('/products/:id', function(req, res){

    ProductController.getAllProducts(req.params.id).then(function(products){
        res.send(products)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.post('/product', function(req, res, next){
    req.body.user_id = req.clientObj.id;
    req.body.isUpsell = !!req.body.upsell_id;
    var new_product = _.omit(req.body, ['upsell_id', 'upsells']);
    new_product.delivery = JSON.stringify(new_product.delivery);
    new_product.materials = JSON.stringify(new_product.materials);
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
        next(err);
    })
});

router.get('/product/upsell', function(req, res, next){

    ProductController.get({user_id: req.clientObj.id, isUpsell: false}).then(function(products){
        res.send(products)
    }).catch(function(err){
        next(err);
    })
});


router.get('/product/:id', function(req, res){

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

router.get('/product/upsell/:id', function(req, res){
    UpsellProductController.getUpsells({upsell_id: req.params.id}).then(function(upsells){
        res.send(upsells)
    }).catch(function(err){
        next(err);
    })
});

router.get('/product/upsell_products/:id', function(req, res){
    UpsellProductController.getForUpsell({upsell_id: req.params.id}).then(function(upsells){
        res.send(upsells)
    }).catch(function(err){
        next(err);
    })
});

router.get('/product/upsells/:id', function(req, res, next){
    UpsellProductController.getForUpsellsProduct({product_id: req.params.id}).then(function(upsells){
        res.send(upsells)
    }).catch(function(err){
        next(err);
    })
});

router.put('/product/:id', function(req, res, next){

    req.body.delivery = JSON.stringify(req.body.delivery);
    req.body.materials = JSON.stringify(req.body.materials);

    var product = _.omit(req.body, ['currency_name','upsell_id', 'upsells']);

    ProductController.editProduct(product).then(function(product){
            res.send(product[0])
    }).catch(function(err){
        next(err);
    })

});

router.delete('/product/:id', function(req, res, next){

    ProductController.deleteProduct(req.params.id).then(function(id){
        res.send(id)
    }).catch(function(err){
        next(err);
        //res.status(400).send(err.errors)
    })

});

router.get('/product', function(req, res, next){

    ProductController.get({user_id: req.clientObj.id}).then(function(products){
        res.send(products)
    }).catch(function(err){
        next(err);
        //res.status(400).send(err.errors)
    })

});

module.exports = router;
