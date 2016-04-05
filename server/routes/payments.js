'use strict';
var express = require('express');
var router = express.Router();

var InterKassa = require('./../payments/interkassa');
var Yandex = require('./../payments/yandex');

var OrderController = require('./../controllers/Order');
var UserController = require('./../controllers/User');


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

    console.log(req.body);

    var data = req.body.label.split('::');

    if(data.length === 3){

        console.log('PAY TARIFF');

        var user_id = data[2];
        var tariff_name = data[0];
        var tariff_duration = data[1];

        UserController.getById(user_id).then((user) => {

            console.log('GET USER', user);

            if(user.tariff_duration === tariff_duration && user.tariff_name === tariff_name){

                console.log('PASS CHECK');

                UserController.activateTariff(user_id).then(() => {

                    res.send('ok');

                })

            }else{

                console.log('CHECK DID NOT PASS');

                res.status(500).send('Error')
            }

        }).catch((err) => {
            console.log(err.stack);
        })

    }else if(data.length === 1){
        OrderController.pay(+req.body.label).then(() => {
            res.send('ok')
        }).catch((err) => {
            res.status(500).send('Error');
        })
    }




});

router.post('/payments/interkassa', (req, res) => {

    console.log('INTERKASSA', req.body);

});


module.exports = router;