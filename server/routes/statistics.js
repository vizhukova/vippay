var express = require('express');
var router = express.Router();
var StatisticController = require('../controllers/Statistic');


router.get('/statistic', function(req, res) {

    StatisticController.get(req.user.id)
            .then(function(statistic){
                res.send(statistic);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});


module.exports = router;