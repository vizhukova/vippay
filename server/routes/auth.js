var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');
var config = require('../config');

var RoboKassa = require('../payments/robokassa');

router.get('/check', function(req, res){

    if(req.user.role != req.query.role) {
        res.status(401).send({msg: 'not ok'});
    } else {
        UserController.getById(req.user.id).then(function(data){
            if(data.length == 0) {
                res.status(401).send({msg: 'not ok'}); return;
            }
            res.status(200).send('ok');
        }).catch(function(err) {
            res.status(401).send({msg: 'not ok'});
        })
    }

    console.log(RoboKassa.buildPaymentUrl('login', 'password', 5, 'desc', 55));

});

router.get('/out', function(req, res) {
    res.cookie('token', '', {maxAge: 9000000000, domain: `.${config.get('domain')}`});
    var link = `http://${req.clientObj.login}.${req.postdomain}`
    res.redirect(link)
});

router.get('/partner/out', function(req, res) {
    res.cookie('token', '', {maxAge: 9000000000, domain: `.${config.get('domain')}`});
    var link = `http://${req.clientObj.login}.${req.postdomain}/partner`
    res.redirect(link)
});


module.exports = router;