var express = require('express');
var router = express.Router();
var config = require('../config');
var PartnerController = require('../controllers/Partner');
var PartnerClientsController = require('../controllers/PartnerClients');
var UserController = require('../controllers/User');
var _ = require('lodash');
var email = require('../utils/email');


router.post('/partner/register', function (req, res, next) {

    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    })

    var partner;
    var client_id = req.clientObj.id;

    if(req.body.login == 'auth' || req.body.login == 'admin' || req.body.login == 'payments' || req.body.login == 'payments') {
        next({constraint: 'users_login_unique'});
        return;
    }

    if(! req.clientObj.id) {
        next({constraint: 'no_client'});
        return;
    }

    //Стоит обернуть в транзакцию
    PartnerController.register({

        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass,
        client_id: req.clientObj.id,
        referer: req.body.referer

    }).then((u) => {

        partner = u;

        var link = `http://${req.clientObj.login}.${req.postdomain}/${partner.modelData.login}`;
        email.send(partner.modelData.email, 'Успешная регистрация', `Спасибо за регистрацию. Ссылка на ваш аккаунт: ${link}`);

        return PartnerController.setFee({
            client_id: client_id,
            partner_id: partner.modelData.id,
            fee_added: 0,
            fee_payed: 0
        })

    }).then((fee) => {

        return PartnerClientsController.set({
                        client_id: req.clientObj.id,
                        partner_id: partner.modelData.id,
                        fee: req.clientObj.fee

                    })

    }).then((fee) => {

        res.cookie('token', partner.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({user: partner, redirect: `http://${req.hostname}/${partner.modelData.login}`})

    }).catch((err) => {
        if(! err.constraint) err.constraint =  'check_this_data';
        next(err);
    })

});

router.post('/partner/login', function (req, res, next) {
    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    });

    PartnerController.login({
        email: req.body.email,
        password: req.body.password,
        client_id: req.clientObj.id,
        referer: req.body.referer
    }).then(function (user) {
        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({user: user, redirect: `http://${req.hostname}/${user.modelData.login}`});
    }).catch(function (err) {
        if(! err.constraint) err.constraint = 'check_this_data';
        next(err);
    })

});

/**
 * Получение продуктов, доступных для просмотра клиенту
 */
router.get(`/partner/:category_id/products`, function (req, res, next) {
    var productsArr = [];
    var partner;

    PartnerController.getById(req.user.id).then((p) => {
            partner = p;
            return PartnerController.getAllProducts({
                partner_id: req.user.id,
                category_id: +req.params.category_id,
                client_id: req.clientObj.id
            });

        }).then(function (products) {
                    products.map((p) => {
                        p.ref_link = `http://${req.clientObj.login}.${config.get('domain')}/redirect/product/${partner.login}/${p.id}`
                    });

                    productsArr =   products;

        //            return UserController.getPartnerLink({user_id: req.clientObj.id, active: true});
        //
        //}).then((links) => {
        //    links.map((p) => {
        //        p.ref_link = `/redirect/link/${partner.login}/${p.key}`
        //    });
        //
        //    var union = productsArr.concat(links);
        //    res.send(union);

            res.send(productsArr);
        })
        .catch(function (err) {
            next(err);
        });
});

router.get('/partner', function (req, res, next) {
    PartnerController.getAll(req.clientObj.id)
        .then(function (partners) {
            res.send(partners)
        }).catch(function (err) {
            next(err);
    });
});

router.get('/partner/current', function (req, res, next) {
    PartnerController.getById(req.user.id)
        .then(function (partners) {
            res.send(partners)
        }).catch(function (err) {
            next(err);
    });
});

router.put('/partner', function (req, res, next) {
    PartnerController.edit(_.omit(req.body, ['fee', 'partner_fee']))
        .then(function (partner) {
            res.send(partner)
        }).catch(function (err) {
            next(err);
    });
});

router.get('/partner', function (req, res, next) {
    PartnerController.get(req.clientObj.id)
        .then(function (partner) {
            res.send(partner)
        }).catch(function (err) {
            next(err);
    });
});

router.get('/partner/fee', function (req, res, next) {
    PartnerController.getFee(req.clientObj.id)
        .then(function (fee) {
            res.send(fee)
        }).catch(function (err) {
            next(err);
    });
});

router.put('/partner/fee', function (req, res, next) {
    var fee = req.body.fee || {};

    if(fee.fee_pay) {
        fee.fee_added = fee.fee_added || 0;
        fee.fee_payed = fee.fee_payed || 0;

        fee.fee_added -= fee.fee_pay;
        fee.fee_payed = (+fee.fee_payed) + (+fee.fee_pay);

        PartnerController.putFee(_.omit(fee, ['fee_pay']))
        .then(function (fee) {
            res.send(fee[0]);
            }).catch(function (err) {
            next(err);
        });
    } else {
        res.send({});
    }

});

router.put('/partner/individual_fee', function (req, res, next) {

    var newObj = {
        client_id: req.clientObj.id,
        partner_id: req.body.id,
        fee: req.body.partner_fee
    };

    PartnerClientsController.edit(newObj)
    .then(function (data) {
        res.send(data);
        }).catch(function (err) {
        next(err);
    });


});

router.get('/partner/partnerlinks', function (req, res, next) {
    UserController.getPartnerLink({user_id: req.clientObj.id, active: true})
        .then(function (partnerLinks) {
            res.send(partnerLinks)
        }).catch(function (err) {
            next(err);
        });
});


module.exports = router;