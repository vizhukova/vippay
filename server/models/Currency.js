var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

/**
 * Модель валюты
 */
var Currency = bookshelf.Model.extend({

    tableName: 'currency',

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
    get: Promise.method(function () {
        return knex.select().from('currency');
    })
})

module.exports = Currency;