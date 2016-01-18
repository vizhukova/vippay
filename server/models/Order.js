var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

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

    get: Promise.method(function (id) {
        return knex.select('orders.product', 'orders.step', 'orders.history', 'partners.name', 'partners.login', 'partners.email')
            .from('orders') .where('orders.id', id).innerJoin('partners', 'orders.partner_id', '=', 'partners.id')
    }),

    add: Promise.method(function (data) {
        var record = new this({customer_id: data.customer.id,
                               partner_id: data.customer.partner_product_id.partner_id[data.customer.partner_product_id.partner_id.length - 1],
                               client_id: data.product.user_id,
                               product_id: data.product.id,
                               product: JSON.stringify(data.product),
                               step: "pending"
        });

        return record.save();
    })

})

module.exports = Order;