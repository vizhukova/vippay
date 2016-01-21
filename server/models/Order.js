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
              (SELECT partners.name from partners WHERE partners.id = orders.partner_id),
              (SELECT partners.login from partners WHERE partners.id = orders.partner_id),
              (SELECT partners.email from partners WHERE partners.id = orders.partner_id)`))
            .from('orders') .where('orders.client_id', client_id)
    }),

    add: Promise.method(function (data) {
        var partnerId = data.customer.partner_product_id.partner_id;
        var lastPartnerId = partnerId ? partnerId[partnerId.length - 1] : null;

        var record = new this({customer_id: data.customer.id,
                               partner_id: lastPartnerId,
                               client_id: data.product.user_id,
                               product_id: data.product.id,
                               product: JSON.stringify(data.product),
                               step: "pending",
                               delivery: JSON.stringify(data.delivery)
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