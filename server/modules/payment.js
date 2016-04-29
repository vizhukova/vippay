var Order = require('./../models/Order');
var User = require('./../models/Users');

var InterKassa = require('./../payments/interkassa');
var Yandex = require('./../payments/yandex');
var LiqPay = require('./../payments/liqpay');

var _ = require('lodash');

/**
 * Сбор данных для отрисовки страницы оплаты заказа
 * @param req
 * @param res
 * @param next
 */
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

                return InterKassa.getData(+req.params.order_id, +client.id)
            }
    
        }).then((interkassa) => {
    
            payments.interkassa = interkassa;
    
            return Yandex.getData(+req.params.order_id, +client.id);
    
        }).then((yandex) => {

            payments.yandex = yandex;

            return LiqPay.getData(+req.params.order_id, +client.id);


        }).then((liqpay) => {
    
            payments.liqpay = liqpay;

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