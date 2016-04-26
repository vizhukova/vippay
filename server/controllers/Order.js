var Order = require('../models/Order');
var User = require('../models/Users');
var Rate = require('../models/Rate');
var Customer = require('../models/Customer');
var Statistic = require('../models/Statistic');
var PartnersClients = require('../models/PartnerClients');
var Fee = require('../models/Fee');
var Promise = require('bluebird');
var _ = require('lodash');
var email = require('../utils/email');

module.exports = {

    get(client_id) {
        return new Promise(function (resolve, reject) {

            Order.get(client_id)
                .then(function (orders) {
                    resolve(orders)
                }).catch(function (err) {
                reject(err);
            });
        })
    },

    edit(data) {
        return new Promise(function (resolve, reject) {

            Order.edit(data)
                .then(function (order) {
                    resolve(order)
                }).catch(function (err) {
                reject(err);
            });
        })
    },

    /*setComplete(data) {
        return new Promise(function (resolve, reject) {

            var order;
            Order.setComplete(data)
                .then(function (o) {
                    order = o[0];

                    if(order.step == 'complete') {
                        if(order.product.material){
                            text = 'Спасибо за оплату заказа. Оплата прошла успешно';
                        }else{
                            text = `Спасибо за оплату заказа. Оплата прошла успешно. Ссылка на товар: `;
                            order.product.map((product) => {
                                text += `${product.link_download}  `;
                            })
                        }

                        email.send(order.delivery.email, 'Успешная оплата заказа', text);
                    }
                    //return Order.get(order.client_id)
                    resolve([order]);
                }).then((orders) => {
                resolve(orders);
            }).catch(function (err) {
                reject(err);
            });
        })
    },*/

    getById(id) {
        return new Promise(function (resolve, reject) {

            Order.getById(id).then(function (order) {
                resolve(order)
            }).catch(function (err) {
                reject(err);
            });

        })
    },

    add(data) {
        return new Promise(function (resolve, reject) {

             Order.add(data).then(function (order) {

                    resolve(order.attributes);

                }).catch((err) => {

                 reject(err);

             })

        })
    },

    pay(id) {

        return new Promise((resolve, reject) => {

            var order;
            var customer;
            var partner_id;
            var feeToAdd;

           Order.pay(id).then((o) => {

               var text;
               var links = o.links;

               order = o.order;

                if(order.product[0].material){
                    text = 'Спасибо за оплату заказа. Оплата прошла успешно';
                }else{
                    text = `Спасибо за оплату заказа. Оплата прошла успешно. Ссылка на товар: `;
                    links.map((link_download) => {
                        text += `${link_download}`;
                    })
                }

                email.send(order.delivery.email, 'Успешная оплата заказа', text);

               return Customer.get(order.customer_id);

           }).then((c) => {

               customer = c;

               return Statistic.add({
                    partner_id: order.partner_id,
                    product: JSON.stringify(order.product),
                    customer_id: order.customer_id,
                    client_id: order.client_id,
                    order_id: order.id,
                    action: "pending_order"
                })


           }).then((s) => {

                if(! customer.partner_product_id.partner_id.length) {
                        resolve([order]);
                        return;
                    }

                    return User.getById(order.client_id);

           }).then((u) => {

               partner_id = u.partner_fee == 'last'
                        ? customer.partner_product_id.partner_id[customer.partner_product_id.partner_id.length - 1]
                        : customer.partner_product_id.partner_id[0];

                return PartnersClients.get({client_id: order.client_id, partner_id: partner_id});

           }).then((p_c) => {

               if(! p_c.length) throw new Error('no_partners');
               else {
                   feeToAdd = p_c[0].fee;
                   return Fee.get(order.client_id);
               }

           }).then((fees) => {

               var fee = _.findWhere(fees, {partner_id: partner_id});

               if(!fee) {

                   return Fee.set({
                       client_id: order.client_id,
                       partner_id: partner_id,
                       fee_payed: 0,
                       fee_added: feeToAdd
                   })

               } else {

                   var newFee = (+fee.fee_added) + (+feeToAdd);

                   return Fee.put({
                       client_id: order.client_id,
                       partner_id: partner_id,
                       fee_added: newFee
                   })

               }

           }).then((newFee) => {

               resolve(order);

           }).catch((err) => {

               if(err.message == 'no_partners') resolve(order);
               else reject(err);
           })

        });

    },

    cancelPay(id) {

         return new Promise((resolve, reject) => {

            var order;
            var customer;
            var partner_id;
            var feeToAdd;

           Order.setComplete({id: id, step: 'pending'}).then((o) => {

               order = o[0];

               return Customer.get(order.customer_id);

           }).then((c) => {

               customer = c;

               return Statistic.delete({
                   partner_id: order.partner_id,
                   customer_id: order.customer_id,
                   client_id: order.client_id,
                   order_id: order.id,
                   action: "pending_order"
               })

           }).then((s) => {

                if(! customer.partner_product_id.partner_id.length) {
                        resolve([order]);
                        return;
                    }

                    return User.getById(order.client_id);

           }).then((u) => {

               partner_id = u.partner_fee == 'last'
                        ? customer.partner_product_id.partner_id[customer.partner_product_id.partner_id.length - 1]
                        : customer.partner_product_id.partner_id[0];

                return PartnersClients.get({client_id: order.client_id, partner_id: partner_id});

           }).then((p_c) => {

               if(! p_c.length) throw new Error('no_partners');
               else {
                   feeToAdd = p_c[0].fee;
                   return Fee.get(order.client_id);
               }

           }).then((fees) => {

               var fee = _.findWhere(fees, {partner_id: partner_id});

               if(!fee) {

                   return Fee.set({
                       client_id: order.client_id,
                       partner_id: partner_id,
                       fee_payed: 0,
                       fee_added: 0
                   })

               } else {

                   var newFee = (+fee.fee_added) - (+feeToAdd);

                   return Fee.put({
                       client_id: order.client_id,
                       partner_id: partner_id,
                       fee_added: newFee
                   })

               }

           }).then((newFee) => {

               resolve(order);

           }).catch((err) => {

               if(err.message == 'no_partners') resolve(order);
               else reject(err);
           })

        });

    }

};