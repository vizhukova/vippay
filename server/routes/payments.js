'use strict';
var express = require('express');
var router = express.Router();

var InterKassa = require('./../payments/interkassa');


router.get('/payments/data/:order/:method', function(req, res){

    InterKassa.getData(req.params.order, 1).then((payment_data) => {

        res.send(payment_data);

    }).catch((err) => {

        res.status(500).send('Something went wrong');

    })

});



router.post('/payments/yandex', (req, res) => {

    console.log(5)


});


module.exports = router;