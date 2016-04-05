var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Basket = bookshelf.Model.extend({

    tableName: 'baskets',

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
        return knex('baskets')
            .select('*')
            .where(data)
    },

    add: Promise.method(function (data) {
        var record = new this(data);
        return record.save();
    }),

    edit(data) {
        return knex('baskets')
            .update(data)
            .where({id: data.id})
            .returning('*')
    }
});

module.exports = Basket;