var express = require('express');
var router = express.Router();
var PartnerController = require('../controllers/Partner');


router.post('/partner/register', function(req, res){
    Object.keys(req.body).map((k) => {
        if(req.body[k] === '') req.body[k] = null
    })

    PartnerController.register({
        client_id: req.body.client_id,
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass
    }).then(function(user){
        res.send(user)
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
        client_id: req.body.client_id
    }).then(function(user){
        res.send(user)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

router.get('/partner/products', function (req, res) {
    PartnerController.getAllProducts(req.user.id).then(function (products) {
        products.map((p) => {
            p.ref_link = `/redirect/${req.user.id}-${p.id}`
        });
            res.send(products)
        }).catch(function (err) {
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


module.exports = router;