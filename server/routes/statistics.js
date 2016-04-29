var express = require('express');
var router = express.Router();
var StatisticController = require('../controllers/Statistic');

/**
 * Получение статистики клиента
 */
router.get('/statistic', function(req, res, next) {

    StatisticController.get(req.clientObj.id)
            .then(function(statistic){
                res.send(statistic[0]);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                next(err);
            });

});

/**
 * Получение статистики партнера
 */
router.get('/partner/statistic', function(req, res, next) {

    StatisticController.getByPartner({partner_id: req.user.id, client_id: req.clientObj.id})
            .then(function(statistic){
                res.send(statistic[0]);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                next(err);
            });

});


module.exports = router;