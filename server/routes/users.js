var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');
var StaffController = require('../controllers/Staff');
var PartnerController = require('../controllers/Partner');
var RateController = require('../controllers/Rate');
var config = require('../config');
var payments = require('../payment_systems/payment_systems');
var email = require('../utils/email');
var _ = require('lodash');
var passport = require('passport');
var getTariff = require('./../middlewares/tariffs/getTariff');
var checkTrialTariff = require('./../middlewares/tariffs/checkTrialTariff');
var checkBaseTariff = require('./../middlewares/tariffs/checkBaseTariff');

router.post('/client/register', function (req, res, next) {
    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    });
    var user;

    if(req.body.login == 'auth' || req.body.login == 'admin' || req.body.login == 'payments' || req.body.login == 'cdn') {
        next({constraint: 'users_login_unique'});
        return;
    }

    UserController.register({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass,
        basic_currency: 1,
        type: 'client',
        domain: req.postdomain,
        payment: JSON.stringify(payments),
        tariff_payed: true

    }).then(function (userObj) {

        user = userObj;
        email.send(userObj.modelData.email, 'Успешная регистрация', `Спасибо за регистрацию. Ссылка на ваш аккаунт: ${user.domain}`);
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

//
//router.post('/guest_login', (req, res, next) => {
//
//    PartnerController.guestLogin({
//        login: req.body.login
//    }).then(function (user) {
//        res.send(user)
//    }).catch(function (err) {
//        next();
//    })
//
//});

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

/**
 * Получение все клиентов для партнера
 */
router.get('/clients', (req, res, next) => {

    UserController.get(req.user.id)
        .then(function (clients) {
            res.send(clients)
        }).catch(function (err) {
            next();
    })

});

/**
 * Получение текущего клиента для партнера
 */
router.get('/client', (req, res, next) => {
        res.send(req.clientObj);
});


router.put('/user/password', (req, res, next) => {

    UserController.setPassword({passwords: req.body, user_id: req.user.id})
        .then(function (data) {

            var user = data[0];
            email.send(user.email, 'Успешная установка нового пароля', `Ваш новый пароль: ${user.password}`);
            res.send(data)

        }).catch(function (err) {

            if(! err.constraint) err.constraint = 'check_old_password';
            next(err);

    })

});

router.put('/partner/partner_fee', function (req, res, next) {
    req.body.id = req.clientObj.id;

    UserController.set(req.body)
        .then(function (user) {
            res.send({partner_query: user[0].partner_fee});
        }).catch(function (err) {
            next(err);
    });
});

router.get('/partnerlinks', getTariff, checkTrialTariff, checkBaseTariff, function (req, res, next) {
    UserController.getPartnerLink({user_id: req.clientObj.id})
        .then(function (partnerLinks) {
            res.send(partnerLinks)
        }).catch(function (err) {
            next(err);
    });
});

router.get('/partnerlinks/:id', getTariff, checkTrialTariff, checkBaseTariff, function (req, res, next) {
    UserController.getPartnerLink({id: req.params.id})
        .then(function (partnerLink) {
            res.send(partnerLink[0])
        }).catch(function (err) {
            next(err);
    });
});

router.post('/partnerlinks', getTariff, checkTrialTariff, checkBaseTariff, function (req, res, next) {

    req.body.user_id = req.clientObj.id;
    req.body.materials = JSON.stringify(req.body.materials);

    UserController.addPartnerLink(req.body)
        .then(function (partnerLink) {
            res.send(partnerLink)
        }).catch(function (err) {
            next(err);
        });
});

router.put('/partnerlinks', getTariff, checkTrialTariff, checkBaseTariff, function (req, res, next) {

    req.body.materials = JSON.stringify(req.body.materials);
    UserController.editPartnerLink(req.body)
        .then(function (partnerLink) {
            res.send(partnerLink)
        }).catch(function (err) {
        if(err.code == '22001') err.constraint = "too_long_description";
            next(err);
        });
});

router.delete('/partnerlinks/:id', getTariff, checkTrialTariff, checkBaseTariff, function (req, res, next) {

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

router.put('/user', function (req, res, next) {

    var newUser = _.omit(req.body, ['_method']);

    UserController.set(newUser)
        .then(function (user) {
            res.send(user)
        }).catch(function (err) {
            next(err);
        });
});

router.delete('/user', function (req, res, next) {

    var id = +req.body.id;

    UserController.remove({id: id})
        .then(function (user) {
            //res.send(user)
             res.redirect('back')
        }).catch(function (err) {
            next(err);
        });
});






module.exports = router;