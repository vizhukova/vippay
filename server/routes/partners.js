var express = require('express');
var router = express.Router();
var config = require('../config');
var PartnerController = require('../controllers/Partner');
var UserController = require('../controllers/User');
var checkLoginAccess = require('./../middlewares/checkLoginAccess');
var _ = require('lodash');


router.post('/partner/register', checkLoginAccess, function (req, res, next) {
    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    })

    var user;
    var client_id = req.clientObj.id;

    //Стоит обернуть в транзакцию
    PartnerController.register({

        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass,
        client_id: req.clientObj.id

    }).then((u) => {

        user = u;
        return PartnerController.setFee({
            client_id: client_id,
            partner_id: user.modelData.id
        })

    }).then((fee) => {

        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({user: user, redirect: `http://${req.hostname}/${user.modelData.login}`})

    }).catch((err) => {
        if(! err.constraint) err.constraint = 'check_this_data';
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
        client_id: req.clientObj.id
    }).then(function (user) {
        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({user: user, redirect: `http://${req.hostname}/${user.modelData.login}`});
    }).catch(function (err) {
        if(! err.constraint) err.constraint = 'check_this_data';
        next(err);
    })

});

router.get(`/partner/products`, function (req, res) {
    var productsArr = [];
    var partner;

    PartnerController.getById(req.user.id).then((p) => {
            partner = p;
            return PartnerController.getAllProducts({partner_id: req.user.id, client_id: req.clientObj.id});

        }).then(function (products) {
                    products.map((p) => {
                        p.ref_link = `/redirect/product/${partner.login}/${p.id}`
                    });

                    productsArr =   products;

                    return UserController.getPartnerLink({user_id: req.clientObj.id, active: true});

        }).then((links) => {
            links.map((p) => {
                p.ref_link = `/redirect/link/${partner.login}/${p.key}`
            });

            var union = productsArr.concat(links);
            res.send(union);
        })
        .catch(function (err) {
            res.status(400).send(err.errors)
        });
});


router.get('/partner', function (req, res) {
    PartnerController.getAll(req.clientObj.id)
        .then(function (partners) {
            res.send(partners)
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.get('/partner/current', function (req, res) {
    PartnerController.getById(req.user.id)
        .then(function (partners) {
            res.send(partners)
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.put('/partner', function (req, res) {
    PartnerController.edit(_.omit(req.body, ['fee']))
        .then(function (partner) {
            res.send(partner)
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.get('/partner', function (req, res) {
    PartnerController.get(req.clientObj.id)
        .then(function (partner) {
            res.send(partner)
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.get('/partner/fee', function (req, res) {
    PartnerController.getFee(req.clientObj.id)
        .then(function (fee) {
            res.send(fee)
        }).catch(function (err) {
        res.status(400).send(err.errors)
    });
});

router.put('/partner/fee', function (req, res) {
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
            res.status(400).send(err.errors);
        });
    } else {
        res.send({});
    }

});


module.exports = router;