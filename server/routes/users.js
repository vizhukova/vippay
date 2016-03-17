var express = require('express');
var router = express.Router();
var checkLoginAccess = require('./../middlewares/checkLoginAccess');
var UserController = require('../controllers/User');
var StaffController = require('../controllers/Staff');
var PartnerController = require('../controllers/Partner');
var RateController = require('../controllers/Rate');
var config = require('../config');
var payments = require('../payment_systems/payment_systems');
var email = require('../utils/email');
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
        type: 'client',
        domain: req.postdomain,
        payment: JSON.stringify(payments)
    }).then(function (userObj) {
        user = userObj;
        email.send(user.email, 'Успешная регистрация', `Спасибо за регистрацию. Ссылка на ваш аккаунт: ${user.domain}`);
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

    if(req.user.role == 'staff') {
        StaffController.get({id: req.user.id}).then((staff) => {
            staff[0].name = staff[0].login;
            res.send(_.omit(staff[0], ['password']))
        }).catch(function (err) {
            next();
        })
    }
    else {
        UserController.getById(req.user.id).then(function (user) {

            res.send(_.omit(user, ['password']))
        }).catch(function (err) {
            next();
        })
        }

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

router.put('/partner/partner_fee', function (req, res) {
    req.body.id = req.clientObj.id;

    UserController.set(req.body)
        .then(function (user) {
            res.send({partner_query: user[0].partner_fee});
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.get('/partnerlinks', function (req, res) {
    UserController.getPartnerLink({user_id: req.clientObj.id})
        .then(function (partnerLinks) {
            res.send(partnerLinks)
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.get('/partnerlinks/:id', function (req, res) {
    UserController.getPartnerLink({id: req.params.id})
        .then(function (partnerLink) {
            res.send(partnerLink[0])
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.post('/partnerlinks', function (req, res, next) {

    req.body.user_id = req.clientObj.id;
    req.body.materials = JSON.stringify(req.body.materials);

    UserController.addPartnerLink(req.body)
        .then(function (partnerLink) {
            res.send(partnerLink)
        }).catch(function (err) {
            next(err);
        });
});

router.put('/partnerlinks', function (req, res, next) {

    req.body.materials = JSON.stringify(req.body.materials);
    UserController.editPartnerLink(req.body)
        .then(function (partnerLink) {
            res.send(partnerLink)
        }).catch(function (err) {
        if(err.code == '22001') err.constraint = "too_long_description";
            next(err);
        });
});

router.delete('/partnerlinks/:id', function (req, res, next) {

    UserController.removePartnerLink(req.params.id)
        .then(function (partnerLink) {
            res.send(partnerLink)
        }).catch(function (err) {
            next(err);
        });
});

router.get('/client/partner_query', function (req, res, next) {

    UserController.getById(req.clientObj.id)
        .then(function (client) {
            res.send({partner_query: client.partner_fee})
        }).catch(function (err) {
            next(err);
        });
});




module.exports = router;