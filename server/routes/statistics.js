var express = require('express');
var router = express.Router();
var StatisticController = require('../controllers/Statistic');
var log = require('./../utils/log');


router.get('/statistic', function(req, res) {

    StatisticController.get(req.user.id)
            .then(function(statistic){

                var logg = new log('db');
                logg.log(statistic, 'debug');

                res.send(statistic[0]);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/partner/statistic', function(req, res) {

    StatisticController.getByPartner({partner_id: req.user.id, client_id: req.clientObj.id})
            .then(function(statistic){
                res.send(statistic[0]);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});


module.exports = router;