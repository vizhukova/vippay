var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');

function replacePrice(orders) {
     orders.map((order) => {
        order.product.price = +parseFloat(order.product.price);
        order.product_price_order_rate = +parseFloat(order.product_price_order_rate);
        order.product_price_base_rate = +parseFloat(order.product_price_base_rate);
        order.total_price_order_rate = +parseFloat(order.total_price_order_rate);
        order.total_price_base_rate = +parseFloat(order.total_price_base_rate);
        order.delivery_price_order_rate = +parseFloat(order.delivery_price_order_rate);
        order.delivery_price_base_rate = +parseFloat(order.delivery_price_base_rate);
    });
    return orders;
}

function perCent(price, discount) {
    return price  - (price * discount / 100);
}


/**
 * Модель заказов
 */
var Order = bookshelf.Model.extend({

    tableName: 'orders',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({

        }).run(this.attributes);
    }

}, {

    get: Promise.method(function (client_id) {
        return new Promise((resolve, reject) => {
            knex.select(knex.raw(`orders.*,
              (SELECT users.name from users WHERE users.id = orders.partner_id),
              (SELECT users.login from users WHERE users.id = orders.partner_id),
              (SELECT users.email from users WHERE users.id = orders.partner_id)`))
            .from('orders')
            .where('orders.client_id', client_id)
            .orderBy('id', 'desc')
            .then((res) => {
                resolve(replacePrice(res));
            }).catch((err) => {
                reject(err);
            })
        })

    }),

    setComplete: Promise.method(function (data) {
        return knex('orders')
        .update({step: data.step})
        .where('id', '=', data.id)
        .returning('*')
    }),

    getById: Promise.method(function (id) {
        return knex('orders')
                .first()
                .where('orders.id', id)
    }),

    add: Promise.method(function (data) {

        var record = new this(data);

        return record.save();
    }),

    pay(id){

        return new Promise((resolve, reject) => {

            var order;
            var links;

            knex('orders')
            .update({'step': 'complete'})
            .where('id', id)
            .returning('*').then((o) => {
                order = o[0];

                var ids = order.product.map((p) => p.id);

                knex('products').select('link_download').where({material: false}).andWhere('id', 'in', ids).then((l) => {

                    links = l.map((l) => l.link_download);
                    resolve({order: order, links: links});
                })

            })

        });
    },

    edit(data) {
        return knex('orders')
            .update(data)
            .where('id', '=', +data.id)
            .returning('*')
    }

});

module.exports = Order;