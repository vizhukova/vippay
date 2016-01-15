var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/Order');

router.get('/orders', function(req, res) {

    OrderController.get(req.user.id)
        .then(function (orders) {
            res.send(orders)
        }).catch(function (err) {
            res.status(400).send(err);
        })

});


module.exports = router;