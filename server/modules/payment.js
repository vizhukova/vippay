var Order = require('./../models/Order');
var User = require('./../models/Users');

var InterKassa = require('./../payments/interkassa');
var Yandex = require('./../payments/yandex');

var _ = require('lodash');

module.exports = function(req, res, next){

    var order;
    var payments = {};

    Order.getById(+req.params.order_id).then((o) => {

        order = o;

        if(! order) throw new Error();
        else  return InterKassa.getData(req.params.order_id, req.clientObj.id)

    }).then((interkassa) => {

        payments.interkassa = interkassa;

        return Yandex.getData(req.params.order_id, req.clientObj.id);

    }).then((yandex) => {

       payments.yandex = yandex;

        return User.getPayment(req.clientObj.id);

    }).then((p) => {

        req.payment = {
            payments: payments,
            paymentSettings: p.payment,
            order: order
        };

        next();

    }).catch((err) => {

        res.status(404);
        res.render('error', { error: err });

    })

};