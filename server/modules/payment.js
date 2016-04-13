var Order = require('./../models/Order');
var User = require('./../models/Users');

var InterKassa = require('./../payments/interkassa');
var Yandex = require('./../payments/yandex');

var _ = require('lodash');

module.exports = function(req, res, next){

    var order;
    var payments = {};
    var client;
    
    User.getByLogin(req.subdomain).then((c) => {
        
        client = c;
        
        return Order.getById(+req.params.order_id)}).then((o) => {
    
            order = o;
    
            if(! order || order.client_id != client.id) {
                throw new Error();
            }

            else  {

                order.product.map((product) => {

                    delete product.link_download;

                });

                return InterKassa.getData(req.params.order_id, client.id)
            }
    
        }).then((interkassa) => {
    
            payments.interkassa = interkassa;
    
            return Yandex.getData(req.params.order_id, client.id);
    
        }).then((yandex) => {
    
           payments.yandex = yandex;
    
            return User.getPayment(client.id);
    
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