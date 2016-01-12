var ProductController = require('../controllers/Product')
var express = require('express');
var router = express.Router();

router.get('/products/:id', function(req, res){

    ProductController.getAllProducts(req.params.id).then(function(products){
        res.send(products)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.post('/product', function(req, res){
    req.body.user_id = req.user.id.id;
    ProductController.newProduct(req.body).then(function(product){
        res.send(product)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })
});

module.exports = router;
