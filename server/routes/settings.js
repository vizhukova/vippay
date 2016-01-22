var express = require('express');
var router = express.Router();
var SettingsController = require('../controllers/Settings');


router.get('/settings', function(req, res){


    res.send({link: `/partners/#auth/${req.user.id}`});

});

router.put('/rate', function(req, res) {

    SettingsController.editRate(req.body)
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});



module.exports = router;
