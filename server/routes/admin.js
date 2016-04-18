var express = require('express');
var router = express.Router();
var config = require('../config');
var _ = require('lodash');
var jwt = require('jwt-simple');
var moment = require('moment');

var UserController = require('./../controllers/User');
var PartnerClientsController = require('./../controllers/PartnerClients');


router.post('/admin/login', function (req, res, next) {

    if(req.body.password !== '12345') {

        res(400).send();

    }
    else {

        res.cookie('admin', jwt.encode(true, 'secret'), {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({redirect: `http://admin.${req.postdomain}/admin`});

    }

});

router.post('/admin/client/login', function (req, res, next) {

    var id = +req.body.id;
    var user;

    UserController.getByData({id: id}).then((u) => {

        user = u[0];

        res.cookie('token', jwt.encode({id: user.id, role: user.type}, 'secret'), {maxAge: 9000000000, domain: `.${req.postdomain}`});
        res.redirect(`http://${user.login}.${req.postdomain}`);

    }).catch((err) => {

        next(err);

    })

});

router.post('/admin/partner/login', function (req, res, next) {

    var id = +req.body.id;
    var user;

    UserController.getByData({id: id}).then((u) => {

        user = u[0];

        return PartnerClientsController.get({partner_id: user.id});

    }).then((p_c) => {

        if(! p_c.length) {
            throw new Error('no client');
        }

        return UserController.getByData({id: p_c[0].client_id});

    }).then((c) => {

        var client = c[0];

        if(user.active) {
            res.cookie('token', jwt.encode({id: user.id, role: user.type}, 'secret'), {maxAge: 9000000000, domain: `.${req.postdomain}`});
        }
        res.redirect(`http://${client.login}.${req.postdomain}/${user.login}`);


    }).catch((err) => {

        next(err);

    })

});

router.delete('/admin/out', function (req, res, next) {

    res.cookie('admin', '', {maxAge: 9000000000, domain: `.${config.get('domain')}`});
    res.redirect('back');

});


router.put('/admin/user', function (req, res, next) {

    var newUser = _.omit(req.body, ['_method']);

    UserController.set(newUser)
        .then(function (user) {
            res.redirect('back')
        }).catch(function (err) {
            next(err);
        });

});

router.delete('/admin/user', function (req, res, next) {

    var id = +req.body.id;

    UserController.remove({id: id})
        .then(function (user) {
            res.redirect('back')
        }).catch(function (err) {
            next(err);
        });

});

router.put('/admin/user/tariff', function (req, res, next) {

    var newTariff = _.omit(req.body, ['_method']);

    newTariff.tariff_date = moment();
    newTariff.id = +newTariff.id || req.clientObj.id;
    newTariff.tariff_payed =  newTariff.tariff_payed || false;
    if(newTariff.tariff_name == 'start') newTariff.tariff_duration = 12;

    UserController.setTariff(newTariff).then((result) => {
        res.redirect('back');
    }).catch((err) => {
        next(err);
    })

});



module.exports = router;