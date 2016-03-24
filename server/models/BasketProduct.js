var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

var BasketProduct = bookshelf.Model.extend({

    tableName: 'baskets_products',

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({

        }).run(this.attributes);
    }

}, {
    get(data) {
        return knex('baskets_products')
            .select('*')
            .where(data)
    },

    add: Promise.method(function (data) {
        var record = new this(data);
        return record.save();
    }),

    edit(data) {
        return knex('baskets_products')
            .update(data)
            .where({id: data.id})
            .returning('*')
    },

    getWithConvertToBaseCurr(basket_id) {
        return knex.raw(`SELECT  baskets_products.*,currency.name as currency_name,
                              converttobasecurrency(cast(baskets_products.product->>'price' as decimal),
                              int4(baskets_products.product->>'user_id'),
                              int4(baskets_products.product->>'currency_id')) as price_per_unit
                  FROM  baskets_products, currency, users
                  WHERE basket_id = ${basket_id} AND
                  currency.id = users.basic_currency AND
                  int4(baskets_products.product->>'user_id') = users.id`);
    },

    delete(data) {
        return knex('baskets_products')
            .where(data)
            .del();
    }
});

module.exports = BasketProduct;