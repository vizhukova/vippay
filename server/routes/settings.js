var express = require('express');
var router = express.Router();
var SettingsController = require('../controllers/Settings');
var RateController = require('../controllers/Rate');


router.get('/settings', function(req, res){


    res.send({link: `/partners/#auth/${req.user.id}`});

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



module.exports = router;
