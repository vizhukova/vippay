var ProductController = require('../controllers/Product')
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
    var new_product = _.omit(req.body, ['upsell_id', 'upsell_price', 'upsell_name']);
    var new_upsell = _.clone(new_product);

    new_upsell.price = req.body.upsell_price;
    new_upsell.upsell_id = req.body.upsell_id;
    new_upsell.name = req.body.upsell_name;

    ProductController.newProduct(new_product).then(function(product){
        if(req.body.upsell_id) return ProductController.newProduct(new_upsell);
        else  res.send([new_product]);
    }).then((upsell) => {
        res.send([new_product, new_upsell]);
    }).catch(function(err){
        next(err);
    })
});

router.get('/product/upsell', function(req, res, next){

    ProductController.get({user_id: req.clientObj.id, upsell_id: null}).then(function(products){
        res.send(products)
    }).catch(function(err){
        next(err);
    })
});


router.get('/product/:id', function(req, res){

    var product;
    ProductController.getCurrentProduct(req.params.id).then(function(p){
        product = p;

        if(product.upsell_id) {
            return ProductController.getCurrentProduct(product.upsell_id);
        } else {
            res.send(product);
        }
    }).then((upsell) => {

        product.upsell_name = upsell.name;
        product.upsell_price = upsell.price;
        product.upsell_id = upsell.id;
        res.send(product);

    }).catch(function(err){
        res.status(204).send(err.errors)
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

router.delete('/product/:id', function(req, res){

    ProductController.deleteProduct(req.params.id).then(function(id){
        res.send(id)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

module.exports = router;
