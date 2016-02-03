var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');

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


module.exports = router;