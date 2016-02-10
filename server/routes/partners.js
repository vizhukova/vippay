var express = require('express');
var router = express.Router();
var config = require('../config');
var PartnerController = require('../controllers/Partner');


router.post('/partner/register', function(req, res){
    Object.keys(req.body).map((k) => {
        if(req.body[k] === '') req.body[k] = null
    })

    PartnerController.register({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass,
        client_id: req.clientObj.id
    }).then(function(user){
        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({user: user, redirect: `http://${req.hostname}/${user.modelData.login}`})
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.post('/partner/login', function(req, res){
    Object.keys(req.body).map((k) => {
        if(req.body[k] === '') req.body[k] = null
});

    PartnerController.login({
        email: req.body.email,
        password: req.body.password,
        client_id: req.clientObj.id
    }).then(function(user){
        res.cookie('token', user.token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({user: user, redirect: `http://${req.hostname}/${user.modelData.login}`});
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.get(`/partner/products`, function (req, res) {
    PartnerController.getById(req.user.id).then((partner) => {
        return PartnerController.getAllProducts({partner_id: req.user.id, client_id: req.clientObj.id})
        .then(function (products) {
        products.map((p) => {
            p.ref_link = `/redirect/${partner.login}/${p.id}`
        });
            res.send(products)
        })
    })
    .catch(function (err) {
            res.status(400).send(err.errors)
        });
});


router.get('/partners', function(req, res) {
    PartnerController.getAll(req.user.id)
        .then(function(partners){
        res.send(partners)
    }).catch(function(err) {
        res.status(400).send(err.errors)
    });
});

router.put('/partner', function(req, res) {
    PartnerController.edit(req.body)
        .then(function(partner){
        res.send(partner)
    }).catch(function(err) {
        res.status(400).send(err.errors)
    });
});

router.get('/partner', function(req, res) {
    PartnerController.get(req.user.id)
        .then(function(partner){
        res.send(partner)
    }).catch(function(err) {
        res.status(400).send(err.errors)
    });
});


module.exports = router;