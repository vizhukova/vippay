var ProductController = require('../controllers/Product')
var UpsellProductController = require('../controllers/UpsellProduct')
var express = require('express');
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
    req.body.isUpsell = true;
    var new_product = _.omit(req.body, ['upsell_id', 'upsell_price']);
    var product;

    ProductController.newProduct(new_product).then(function(p){
        product = p;

        if(req.body.upsell_id) {
            return UpsellProductController.add({
                product_id: req.body.upsell_id,
                upsell_id: product.id,
                price: req.body.upsell_price
                })
        }else {
         res.send(product);
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
        res.send(p);
    }).catch(function(err){
        res.status(204).send(err.errors)
    })

});

router.get('/product/upsell/:id', function(req, res){
    UpsellProductController.getForUpsell({user_id: req.clientObj.id,
        upsell_id: req.params.id}).then(function(products){
        res.send(products)
    }).catch(function(err){
        next(err);
    })
});

router.put('/product/:id', function(req, res, next){

    var product = _.omit(req.body, ['currency_name', 'upsell_name', 'upsell_price']);

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

module.exports = router;
