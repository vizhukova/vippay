var CurrencyController = require('../controllers/Currency');
var express = require('express');
var router = express.Router();

router.get('/currency', function(req, res){

    CurrencyController.get().then(function(currencies){
        res.send(currencies)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.get('/basicCurrency', function(req, res){

    CurrencyController.getBasic(req.user.id).then(function(currency_id){
        res.send(currency_id)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.put('/basicCurrency', function(req, res){

    CurrencyController.editBasic({client_id: req.user.id, basic_currency: req.body.id}).then(function(currency_id){
        res.send(currency_id)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

module.exports = router;
