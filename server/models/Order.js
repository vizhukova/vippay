var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');

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
        return knex.select(knex.raw(`orders.*,
              (SELECT users.name from users WHERE users.id = orders.partner_id),
              (SELECT users.login from users WHERE users.id = orders.partner_id),
              (SELECT users.email from users WHERE users.id = orders.partner_id)`))
            .from('orders')
            .where('orders.client_id', client_id)
            .orderBy('id', 'desc')

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
        var partnerId = data.customer.partner_product_id.partner_id;
        var lastPartnerId = partnerId ? partnerId[partnerId.length - 1] : null;
        var delivery_price = data.delivery.price ? parseFloat(data.delivery.price, 8) : 0;
        var product_price = data.product.price ? parseFloat(data.product.price, 8) : 0;
        var convert = parseFloat(data.convert, 8);

        var record = new this({customer_id: data.customer.id,
                               partner_id: lastPartnerId,
                               client_id: data.product.user_id,
                               product_id: data.product.id,
                               product: JSON.stringify(data.product),
                               step: "pending",
                               delivery: JSON.stringify(data.delivery),
                               product_price_order_rate: product_price,
                               product_price_base_rate: product_price * data.convert,
                               delivery_price_order_rate: delivery_price,
                               delivery_price_base_rate: delivery_price * data.convert,
                               total_price_order_rate: delivery_price + product_price,
                               total_price_base_rate: (delivery_price + product_price) * data.convert,
                               basic_currency_id: data.basic_currency_id
        });

        return record.save();
    }),

    pay(id){
            return knex('orders')
            .update({'step': 'complete'})
            .where('id', id)
            .returning(['partner_id','customer_id', 'client_id', 'product_id', 'id', 'product']);
    }

})

module.exports = Order;