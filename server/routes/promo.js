var PromoController = require('../controllers/Promo');
var ProductPromo = require('../controllers/ProductPromo');
var Promise = require('bluebird');
var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

router.get('/promo', function(req, res){

    var obj = {client_id: req.clientObj.id};
    _.assign(obj, req.query);
    PromoController.get(obj).then(function(data){
        res.send(data);
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.get('/promo/order', function(req, res, next){

    var promo;
    var products = req.query.product_id;
    PromoController.get({client_id: req.clientObj.id, code: req.query.code}).then(function(p){

        promo = p[0];
        return ProductPromo.get({promo_id: promo.id});

    }).then((p_p) => {

        var arrayForPromo = p_p.map((item) => item.product_id).filter((item) => _.indexOf(products, item.toString()) > -1);

        if(! arrayForPromo.length) throw new Error();
        else res.send({products: arrayForPromo, promo: promo});

    }).catch(function(err){

        if(! err.constraint) err.constraint = 'no_promo_product';
        next(err);

    })

});

router.get('/promo/:id', function(req, res){

    var promo;
    PromoController.get({client_id: req.clientObj.id, id: req.params.id}).then(function(data){

        promo = data[0];
        return ProductPromo.get({promo_id: req.params.id})

    }).then((products) => {

        var arr = [];
        products.map((p) => {
            arr.push(p.product_id);
        })
        promo.products = arr;
        res.send(promo);


    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.post('/promo', function(req, res, next){

    req.body.client_id = req.clientObj.id;
    var promo = _.omit(req.body, ['products']);
    promo.date = moment(req.body.date);

    PromoController.add(promo).then(function(data){
        promo = data.attributes;
        return Promise.map(req.body.products, (p_id) => {
            return ProductPromo.add({product_id: p_id, promo_id: promo.id});
        });
    }).then((p_p) => {
        res.send(promo);
    }).catch(function(err){
        next(err);
        //res.status(400).send(err.errors)
    })

});

router.put('/promo', function(req, res, next){

    var promo = _.omit(req.body, ['products']);
    promo.date = moment(req.body.date);

    PromoController.edit(promo).then(function(data){
        promo = data[0];
        return ProductPromo.delete({promo_id: promo.id});
    }).then(() => {
        return Promise.map(req.body.products, (p_id) => {
            return ProductPromo.add({promo_id: promo.id, product_id: p_id});
        });
    }).then((p_p) => {
        res.send(promo);
    }).catch(function(err){
        next(err);
        //res.status(400).send(err.errors)
    })

});

router.delete('/promo/:id', function(req, res){
    ProductPromo.delete({promo_id: req.params.id}).then((result) => {
         return PromoController.delete({id: req.params.id});
    }).then(function(data){
        res.send(data[0]);
    })
   .catch(function(err){
        res.status(400).send(err.errors)
    })

});



module.exports = router;
