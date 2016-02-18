var express = require('express');
var router = express.Router();
var checkLoginAccess = require('./../middlewares/checkLoginAccess');
var UserController = require('../controllers/User');
var PartnerController = require('../controllers/Partner');
var RateController = require('../controllers/Rate');
var config = require('../config');
var payments = require('../payment_systems/payment_systems');
var _ = require('lodash');

router.post('/client/register', checkLoginAccess, function (req, res, next) {
    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    });
    var user;

    UserController.register({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass,
        basic_currency: 1,
        domain: req.postdomain,
        payments: JSON.stringify(payments)
    }).then(function (userObj) {
        user = userObj;
        return RateController.setDefault(userObj.modelData.id)

    }).then((rate) => {
        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send(user);
    }).catch(function (err) {
        if(! err.constraint) err.constraint = 'check_this_data';
        next(err);
    })

});

router.post('/client/login', function (req, res, next) {
    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    });

    UserController.login({
        email: req.body.email,
        password: req.body.password,
        domain: req.postdomain
    }).then(function (user) {
        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send(user);
    }).catch(function (err) {
        if(! err.constraint) err.constraint = 'check_this_data';
        next(err);
    })

});

router.post('/guest_login', (req, res, next) => {

    PartnerController.guestLogin({
        login: req.body.login
    }).then(function (user) {
        res.send(user)
    }).catch(function (err) {
        next();
    })

});

router.get('/me', (req, res, next) => {

    UserController.getById(req.user.id).then(function (user) {

        res.send(_.omit(user, ['password']))
    }).catch(function (err) {
        next();
    })

});

router.get('/clients', (req, res, next) => { //get all clients for partner

    UserController.get(req.user.id)
        .then(function (clients) {
            res.send(clients)
        }).catch(function (err) {
            next();
    })

});

router.get('/client', (req, res, next) => { //get current client for partner
        res.send(req.clientObj);
});

router.put('/user/password', (req, res, next) => { //get all clients for partner

    UserController.setPassword({passwords: req.body, user_id: req.user.id})
        .then(function (data) {
            res.send(data)
        }).catch(function (err) {
            if(! err.constraint) err.constraint = 'check_old_password';
            next(err);
    })

});


module.exports = router;