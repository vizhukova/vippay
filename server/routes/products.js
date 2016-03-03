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
    ProductController.newProduct(req.body).then(function(product){
        res.send(product)
    }).catch(function(err){
        next(err);
    })
});

router.get('/product', function(req, res, next){

    ProductController.get({user_id: req.clientObj.id}).then(function(product){
        res.send(product)
    }).catch(function(err){
        next(err);
    })
});


router.get('/product/:id', function(req, res){

    ProductController.getCurrentProduct(req.params.id).then(function(product){
        res.send(product)
    }).catch(function(err){
        res.status(204).send(err.errors)
    })

});

router.put('/product/:id', function(req, res, next){

    var product =_.omit(req.body, ['currency_name']);
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
