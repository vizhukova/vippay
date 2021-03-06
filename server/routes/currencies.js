var CurrencyController = require('../controllers/Currency');
var express = require('express');
var router = express.Router();

router.get('/currency', function(req, res, next){

    CurrencyController.get().then(function(currencies){
        res.send(currencies)
    }).catch(function(err){
        //res.status(400).send(err.errors)
        next(err);
    })

});

router.get('/basicCurrency', function(req, res, next){

    CurrencyController.getBasic({user_id: req.clientObj.id}).then(function(currency){
        res.send({id: currency.basic_currency})
    }).catch(function(err){
        //res.status(400).send(err.errors)
        next(err);
    })

});

router.put('/basicCurrency', function(req, res, next){

    CurrencyController.setBasic({id: req.body.id, user_id: req.clientObj.id}).then(function(currency){
        res.send({id: currency[0]})
    }).catch(function(err){
        //res.status(400).send(err.errors)
        next(err);
    })

});

module.exports = router;
