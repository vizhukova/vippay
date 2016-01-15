var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Product = bookshelf.Model.extend({

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

    add: Promise.method(function (product, customer) {

        var record = new this({
            customer_id: customer.id,
            partner_id: customer.partner_id[customer.partner_id.length - 1],
            client_id: product.user_id,
            product_id: product.id,
            product: JSON.stringify(product),
            step: 'pending'
        });
        return record.save();
    })

})

module.exports = Product;