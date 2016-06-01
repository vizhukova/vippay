var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');
var StaffController = require('../controllers/Staff');
var config = require('../config');

var RoboKassa = require('../payments/robokassa');

router.get('/check', function(req, res){

    if(req.user.role == 'staff') {
        StaffController.get({id: req.user.id, client_id: req.clientObj.id}).then((staff) => {
            if(staff.length > 0) {res.status(200).send('ok');}
            else {res.status(401).send({msg: 'not ok'});}
        }).catch((err) => {
            res.status(401).send({msg: 'not ok'});
        })
    }

    else if(!req.user || req.user.role != req.query.role) {
        res.status(401).send({msg: 'not ok'});
    }
    else {
        UserController.getById(req.user.id).then(function(data){
            if(!data) {
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
    //var link = `http://${req.clientObj.login}.${req.postdomain}`;
    //res.redirect(link)
    res.send(200);
});

router.get('/partner/out', function(req, res) {
    res.cookie('token', '', {maxAge: 9000000000, domain: `.${config.get('domain')}`});
    //var link = `http://${req.clientObj.login}.${req.postdomain}/partner`;
    //res.redirect(link)
    res.send(200);
});


module.exports = router;