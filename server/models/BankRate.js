var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Rate = bookshelf.Model.extend({

    tableName: 'bank_rate',

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({}).run(this.attributes);
    }

}, {

    get(data) {
        return knex('bank_rate')
            .select('*')
            .where(data)
            .orderBy('from', 'asc');
    },

    add: Promise.method(function (data) {
        var record = new this(data);
        return record.save();
    }),

    delete(data) {
        return knex('bank_rate')
            .del()
            .where(data)
            .returning('*');
    },

    getWhereIn(data) {
        return knex('bank_rate')
            .select('*')
            .whereIn(data)
            .orderBy('from', 'asc');
    }
});

module.exports = Rate;