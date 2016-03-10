var PromoController = require('../controllers/Promo');
var ProductPromo = require('../controllers/ProductPromo');
var Promise = require('bluebird');
var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();


router.get('/promo', function(req, res){
    PromoController.get({client_id: req.clientObj.id}).then(function(data){
        res.send(data)
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


module.exports = router;
