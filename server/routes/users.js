var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');
var PartnerController = require('../controllers/Partner');
var RateController = require('../controllers/Rate');
var config = require('../config');


router.post('/client/register', function (req, res) {
    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    })
    var user;

    UserController.register({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass,
        basic_currency: 1,
        domain: req.postdomain
    }).then(function (userObj) {
        user = userObj;
        return RateController.setDefault(userObj.modelData.id)

    }).then((rate) => {
        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send(user);
    }).catch(function (err) {
        res.status(400).send(err.errors)
    })

});

router.post('/client/login', function (req, res) {
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
        res.status(400).send(err.errors)
    })

});

router.post('/guest_login', (req, res) => {

    PartnerController.guestLogin({
        login: req.body.login
    }).then(function (user) {
        res.send(user)
    }).catch(function (err) {
        res.status(400).send(err.errors)
    })

});

router.get('/me', (req, res) => {

    UserController.getById(req.user.id).then(function (user) {
        res.send(user)
    }).catch(function (err) {
        res.status(400).send(err.errors)
    })

});

router.get('/clients', (req, res) => { //get all clients for partner

    UserController.get(req.user.id)
        .then(function (clients) {
            res.send(clients)
        }).catch(function (err) {
        res.status(400).send(err.errors)
    })

});

router.get('/client', (req, res) => { //get current client for partner
        res.send(req.clientObj);
});


module.exports = router;