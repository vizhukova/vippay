var config = require('./../config');
var auth_domain = config.get('auth_domain');
var express = require('express');
var router = express.Router();
var SettingsController = require('../controllers/Settings');
var RateController = require('../controllers/Rate');
var _ = require('lodash');


router.get('/settings', function(req, res){

    var link = `http://${req.subdomain}.${req.postdomain}/partners`;
    res.send({link: link, auth_domain: auth_domain, out_link: `http://${req.subdomain}.${req.postdomain}/api/out`});

});

router.get('/settings/partner', function(req, res){

    res.send({domain: req.postdomain, auth_domain: auth_domain, out_link: `http://${req.subdomain}.${req.postdomain}/api/partner/out`});

});

router.put('/rate', function(req, res) {

    RateController.edit({rate: req.body, client_id: req.user.id})
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/rate', function(req, res) {

    RateController.get(req.user.id)
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/fee', function(req, res) {

    SettingsController.getFee(req.user.id)
            .then(function(fee){
                res.send(fee);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.put('/fee', function(req, res) {

    SettingsController.editFee({client_id: req.user.id, fee: req.body.fee})
            .then(function(fee){
                res.send(fee);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/payment', function(req, res) {

    SettingsController.getPayment(req.user.id)
            .then(function(data){
                res.send(data.payment);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.put('/payment', function(req, res) {

    SettingsController.putPayment({payment: req.body, user_id: req.user.id})
            .then(function(payment){
                res.send(payment);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/settings/tariff', function(req, res) {
    res.send({
       'base': [{time: '12', price: '2500'}],
        'ultimate': [{time: '3', price: '3000'}, {time: '6', price: '5250'}, {time: '12', price: '9000'}],
        'premium': [{time: '3', price: '6000'}, {time: '6', price: '9000'}, {time: '12', price: '18000'}]
    });

});

router.post('/settings/tariff', function(req, res) {
    SettingsController.setTariff(req.data);
});



module.exports = router;
