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

module.exports = router;
