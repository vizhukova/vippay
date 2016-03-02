var config = require('./../config');
var auth_domain = config.get('auth_domain');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var RateController = require('../controllers/Rate');
var FeeController = require('../controllers/Fee');
var UserController = require('../controllers/User');
var StaffController = require('../controllers/Staff');
var AclController = require('../controllers/Acl');
var _ = require('lodash');
var moment = require('moment');
var email = require('../utils/email');

var checkTrialTariff = require('./../middlewares/tariffs/checkTrialTariff');
var checkBaseTariff = require('./../middlewares/tariffs/checkBaseTariff');
var checkStartTariff = require('./../middlewares/tariffs/checkStartTariff');


router.get('/settings', function(req, res){

    var link = `http://${req.subdomain}.${req.postdomain}/partners`;
    res.send({link: link,
              auth_domain: auth_domain,
              out_link: `http://${req.subdomain}.${req.postdomain}/api/out`,
              isStaff: req.staffObj ? true : false});

});

router.get('/settings/partner', function(req, res){

    res.send({domain: req.postdomain, auth_domain: auth_domain, out_link: `http://${req.subdomain}.${req.postdomain}/api/partner/out`});

});

router.put('/rate', checkTrialTariff, checkBaseTariff, checkStartTariff,  function(req, res) {

    RateController.edit({rate: req.body, client_id: req.clientObj.id})
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/rate', function(req, res) {

    RateController.get(req.clientObj.id)
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/fee', function(req, res) {

    FeeController.getFee(req.clientObj.id)
            .then(function(fee){
                res.send(fee);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.put('/fee', checkTrialTariff, checkBaseTariff, checkStartTariff,  function(req, res, next) {

    FeeController.editFee({id: req.clientObj.id, fee: req.body.fee})
            .then(function(fee){
                res.send(fee);
            }).catch(function(err) {
                if( err.code == '22003')
                err.constraint = 'too_big_value';
                next(err);
            });

});

router.get('/payments', function(req, res) {

    UserController.getPayment(req.clientObj.id)
            .then(function(data){
                res.send(data.payment);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.put('/payments', checkTrialTariff, checkBaseTariff, checkStartTariff,   function(req, res) {

    UserController.putPayment({payment: req.body, user_id: req.clientObj.id})
            .then(function(payment){
                res.send(payment);
            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});

router.get('/settings/tariff', checkTrialTariff, checkBaseTariff, checkStartTariff, function(req, res) {
    var active = req.tariff.active;

    UserController.getTariff(req.clientObj.id).then((result) => {
        if(result.tariff_name === 'start') result.isActive = active;
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.errors)
    })

});


router.put('/settings/tariff', function(req, res) {
    UserController.setTariff({
        tariff_duration: req.body.time,
        tariff_name: req.body.name,
        tariff_date: moment(),
        id: req.clientObj.id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});

router.put('/settings/tariff/pay', function(req, res) {
    UserController.setTariff({
        tariff_payed: true,
        tariff_date: moment(),
        id: req.clientObj.id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});

router.get('/staff', function(req, res) {
    StaffController.get({
        client_id: req.clientObj.id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});

router.get('/staff/:id', function(req, res) {
    StaffController.get({
        id: req.params.id
    }).then((result) => {
        res.send(result[0])
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});

router.post('/staff', function(req, res, next) {
    req.body.staff.client_id = req.clientObj.id;
    var staff = {};
    StaffController.add(req.body.staff).then((s) => {
        staff = s.attributes;
        return Promise.map(req.body.routes, function (item, index) {
            _.assign(item, {staff_id: staff.id});

            return AclController.add(item);
        })
    }).then((routes) => {
        var domain = `http://${req.subdomain}.${req.postdomain}`;
        email.send(staff.email, 'Данные для входа', `Ссылка для входа на сайт: ${domain}.
                                                                Ваш логин: ${staff.login}.
                                                                Ваш пароль: ${staff.password}`);
        res.send(staff);
    }).catch((err) => {
        if(err.code == 23502) err.constraint = 'check_this_data';
        next(err);
        //res.status(404).send(err.error)
    })
});

router.put('/staff/active/:id', function(req, res) {
    StaffController.edit(req.body).then((result) => {
        res.send(result[0])
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});

router.put('/staff/:id', function(req, res, next) {

    var staff = {};
    StaffController.edit(req.body.staff).then((s) => {
        staff = s[0];

        return AclController.get({staff_id: +staff.id});

    }).then((routes) => {

        return Promise.map(req.body.routes, function (item, index) {
            _.assign(item, {staff_id: staff.id});

            if(routes.length > 0)return AclController.edit(item);
            else return AclController.add(item);
        })

    }).then((r) => {
         var domain = `http://${req.subdomain}.${req.postdomain}`;
         email.send(staff.email, 'Данные для входа', `Ссылка для входа на сайт: ${domain}.
                                                                Ваш логин: ${staff.login}.
                                                                Ваш пароль: ${staff.password}`);
        res.send(staff[0]);
    }).catch((err) => {
        if(err.code == 23502) err.constraint = 'check_this_data';
        next(err);
        //res.status(404).send(err.error)
    })
});

router.delete('/staff/:id', function(req, res, next) {

    StaffController.remove(req.params.id).then((result) => {
        res.send(result[0])
    }).catch((err) => {
       res.status(400).send(err.error)
    })
});

router.get('/routes/:id', function(req, res) {
    AclController.get({
        staff_id: req.params.id
    }).then((routes) => {
        res.send(routes)
    }).catch((err) => {
        res.status(404).send(err.error)
    })
});


module.exports = router;
