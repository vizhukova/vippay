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
    }
});

module.exports = BasketProduct;