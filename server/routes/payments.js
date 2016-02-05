var express = require('express');
var router = express.Router();

var InterKassa = require('../payments/interkassa');


router.get('payments/data/:order/:method', function(req, res){

    InterKassa.getData(req.params.order, req.user.id).then((payment_data) => {

        res.send(payment_data);

    }).catch((err) => {

        res.status(500).send('Something went wrong');

    })

});


router.post('payments/data/:order/:method', (req, res) => {




});


module.exports = router;