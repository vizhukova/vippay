var Order = require('../models/Order');
var User = require('../models/Users');
var Rate = require('../models/Rate');
var Customer = require('../models/Customer');
var Partner = require('../models/Partner');
var Statistic = require('../models/Statistic');
var PartnersClients = require('../models/PartnerClients');
var Fee = require('../models/Fee');
var Promise = require('bluebird');
var _ = require('lodash');
var moment = require('moment');
var email = require('../utils/email');

var config = require('./../config');
// rename db to prod_db
var prod_knex = require('knex')(config.get('prod_db'));

/**
 * Работа с заказами
 * @type {{get: (function(*=)), edit: (function(*=)), getById: (function(*=)), add: (function(*=)), pay: (function(*=)), cancelPay: (function(*=))}}
 */
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
            var feeToAddSecondary;
            var fee;
            var feeSecondary;
            var total;
            var referer;

            Order.pay(id).then((o) => {

                var text;
                var links = o.links;

                order = o.order;

                if (order.product[0].material) {
                    text = 'Спасибо за оплату заказа. Оплата прошла успешно';
                } else {
                    text = `Спасибо за оплату заказа. Оплата прошла успешно. Ссылка на товар: `;
                    links.map((link_download) => {
                        text += `${link_download}`;
                    })
                }

                //var a =moment().add(1, 'months').format('YYYY-MM-DD')

                email.send(order.delivery.email, 'Успешная оплата заказа', text);


                return new Promise((resolve, reject) => {

                     if(order.special_login) {
                    /*
                        отправить запрос на сторонний сайт
                     */

                         var user = {};
                        prod_knex('packages')
                         .first()
                         .where({id: order.package_id})
                         .then((u) => {

                           user = u;
                           return prod_knex('user/packages')
                            .insert({
                                package: order.package_id,
                                user: order.special_login,
                                price: user.price,
                                'followers-available': user.followers,
                                expired_at: moment().add(1, 'months').format('YYYY-MM-DD')

                             })
                        }).then(() => {
                            console.log('inserted into user/packages', {package: order.package_id, user: order.special_login, price: user.price, 'followers-available': user.followers, expired_at: moment().add(1, 'm').format('YYYY-MM-DD')});
                            resolve();
                        }).catch((err) => {
                            console.log('error insert user/packages: ', err);
                            reject(err);
                        })

                    } else {
                         resolve();
                    }
                })

             }).then(() => {

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

                if (!customer.partner_product_id.partner_id.length) {
                    resolve(order);
                    return;
                }

                return User.getById(order.client_id);

            }).then((u) => {

                partner_id = u.partner_fee == 'last'
                    ? customer.partner_product_id.partner_id[customer.partner_product_id.partner_id.length - 1]
                    : customer.partner_product_id.partner_id[0];

                return PartnersClients.get({client_id: order.client_id, partner_id: partner_id});

            }).then((p_c) => {

                total = +order.total_price_base_rate;

                if (order.product.length === 1) {
                    fee = +order.product[0].fee || 0;
                    feeToAdd = (total * fee) / 100;
                    feeSecondary = +order.product[0].fee_secondary || 0;
                    feeToAddSecondary = (total * feeSecondary) / 100;
                }

                else {
                    fee = p_c[0].fee;
                    feeToAdd = (total * fee) / 100;
                    feeSecondary =  p_c[0].fee_secondary;
                    feeToAddSecondary = (total * feeSecondary) / 100;
                }

                //if(!feeToAdd){
                //    fee = p_c[0].fee;
                //    feeToAdd = (total * fee)/100;
                return Fee.get(order.client_id);
                //}else{
                //    return Promise.resolve([])
                //}

            }).then((fees) => {

                if (fees.length === 0) {
                    return Promise.resolve()
                }

                var resultFee = _.findWhere(fees, {partner_id: partner_id});

                if (!resultFee) {

                    return Fee.set({
                        client_id: order.client_id,
                        partner_id: partner_id,
                        fee_payed: 0,
                        fee_added: feeToAdd
                    })

                } else {

                    var newFee = (+resultFee.fee_added) + (+feeToAdd);

                    return Fee.put({
                        client_id: order.client_id,
                        partner_id: partner_id,
                        fee_added: newFee,
                        fee_payed: resultFee.fee_payed
                    })

                }

            }).then((newFee) => {

                return Partner.getReferer(partner_id);

            }).then((r) => {

                referer = r;

                if (referer) {

                    if(!feeToAddSecondary) {
                        feeSecondary = referer.fee_secondary;
                        feeToAddSecondary = (total * feeSecondary) / 100;
                    }

                    return Fee.get(order.client_id);
                } else {
                    return Promise.resolve();
                }

            }).then((fees) => {

                if (!fees) {
                    return Promise.resolve()
                }

                if (fees.length === 0) {
                    return Promise.resolve()
                }

                var resultFee = _.findWhere(fees, {partner_id: referer.id});

                if (!resultFee) {

                    return Fee.set({
                        client_id: order.client_id,
                        partner_id: referer.id,
                        fee_payed: 0,
                        fee_added: feeToAddSecondary
                    })

                } else {

                    var newFee = (+resultFee.fee_added) + (+feeToAddSecondary);

                    return Fee.put({
                        client_id: order.client_id,
                        partner_id: referer.id,
                        fee_added: newFee,
                        fee_payed: resultFee.fee_payed
                    })

                }

            }).then(() => {

                resolve(order);

            }).catch((err) => {

                if (err.message == 'no_partners') resolve(order);
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
            var feeToAddSecondary;
            var fee;
            var feeSecondary;
            var total;
            var referer;

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

                if (!customer.partner_product_id.partner_id.length) {
                    resolve(order);
                    return;
                }

                return User.getById(order.client_id);

            }).then((u) => {

                partner_id = u.partner_fee == 'last'
                    ? customer.partner_product_id.partner_id[customer.partner_product_id.partner_id.length - 1]
                    : customer.partner_product_id.partner_id[0];

                return PartnersClients.get({client_id: order.client_id, partner_id: partner_id});

            }).then((p_c) => {

                total = +order.total_price_base_rate;

                if (order.product.length === 1) {
                    fee = +order.product[0].fee || 0;
                    feeToAdd = (total * fee) / 100;
                    feeSecondary =  +order.product[0].fee_secondary || 0;
                    feeToAddSecondary = (total * feeSecondary) / 100;
                } else {
                    fee = p_c[0].fee;
                    feeToAdd = (total * fee) / 100;
                    feeSecondary =  p_c[0].fee_secondary || 0;
                    feeToAddSecondary = (total * feeSecondary) / 100;
                }

                //if (!feeToAdd){
                //    fee = p_c[0].fee;
                //    feeToAdd = (total * fee)/100;
                return Fee.get(order.client_id);
                //}else{
                //    return Promise.resolve([])
                //}

            }).then((fees) => {

                if (!fee || !fees.length) {
                    return Promise.resolve();
                }

                var resultFee = _.findWhere(fees, {partner_id: partner_id});

                if (!resultFee) {

                    return Fee.set({
                        client_id: order.client_id,
                        partner_id: partner_id,
                        fee_payed: 0,
                        fee_added: 0
                    })

                } else {

                    var newFee = (+resultFee.fee_added) - (+feeToAdd);

                    return Fee.put({
                        client_id: order.client_id,
                        partner_id: partner_id,
                        fee_added: newFee,
                        fee_payed: resultFee.fee_payed
                    })

                }

            }).then((newFee) => {

                return Partner.getReferer(partner_id);

            }).then((r) => {

                referer = r;
                if (referer) {

                    if(!feeSecondary) {
                        feeSecondary = referer.fee_secondary;
                        feeToAddSecondary = (total * feeSecondary) / 100;
                    }

                    return Fee.get(order.client_id);
                } else {
                    return Promise.resolve();
                }

            }).then((fees) => {

                if (!fees) {
                    return Promise.resolve()
                }

                if (fees.length === 0) {
                    return Promise.resolve()
                }

                var resultFee = _.findWhere(fees, {partner_id: referer.id});

                if (!resultFee) {

                    return Fee.set({
                        client_id: order.client_id,
                        partner_id: referer.id,
                        fee_payed: 0,
                        fee_added: feeToAddSecondary
                    })

                } else {

                    var newFee = (+resultFee.fee_added) - (+feeToAddSecondary);

                    return Fee.put({
                        client_id: order.client_id,
                        partner_id: referer.id,
                        fee_added: newFee,
                        fee_payed: resultFee.fee_payed
                    })

                }

            }).then(() => {

                resolve(order);

            }).catch((err) => {

                if (err.message == 'no_partners') resolve(order);
                else reject(err);
            })

        });

    }

};
