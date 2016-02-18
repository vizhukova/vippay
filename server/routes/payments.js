'use strict';
var express = require('express');
var router = express.Router();

var InterKassa = require('./../payments/interkassa');
var Yandex = require('./../payments/yandex');

var OrderController = require('./../controllers/Order');


router.get('/payments/data/:order/:method', function (req, res) {

    if (req.params.method === 'interkassa') {
        InterKassa.getData(req.params.order, req.clientObj.id).then((payment_data) => {

            res.send(payment_data);

        }).catch((err) => {

            res.status(500).send('Something went wrong');

        })
    } else if (req.params.method === 'yandex') {
        Yandex.getData(req.params.order, req.clientObj.id).then((payment_data) => {

            res.send(payment_data);

        }).catch((err) => {

            res.status(500).send('Something went wrong');

        })
    }


});


router.post('/payments/yandex', (req, res) => {

    OrderController.pay(+req.body.label).then(() => {
        res.send('ok')
    }).catch((err) => {
        res.status(500).send('Error');
    })


});


module.exports = router;