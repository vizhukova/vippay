var config = require('./../config');
var auth_domain = config.get('auth_domain');
var express = require('express');
var router = express.Router();
var SettingsController = require('../controllers/Settings');
var RateController = require('../controllers/Rate');
var _ = require('lodash');
var moment = require('moment');


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
    SettingsController.getTariff(req.user.id).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.errors)
    })

});


router.put('/settings/tariff', function(req, res) {
    SettingsController.setTariff({
        tariff_duration: req.body.time,
        tariff_name: req.body.name,
        tariff_date: moment(),
        id: req.user_id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});

router.put('/settings/tariff/pay', function(req, res) {
    SettingsController.setTariff({
        tariff_payed: true,
        tariff_date: moment(),
        id: req.user.id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});

module.exports = router;
