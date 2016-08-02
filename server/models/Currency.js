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
    }),

    convertTo(price, client_id, currFrom, currTo) {
        return new Promise((resolve, reject) => {
            knex.raw(`SELECT convert(${price}, ${client_id}, ${currFrom}, ${currTo})`).then((data) => {
                resolve(data.rows[0].convert);
            }).catch((err) => {
                reject(err);
            })
        });
    },

    convertToBase(price, client_id, currFrom) {
         return new Promise((resolve, reject) => {
            knex.raw(`SELECT convert(${price}, ${client_id}, ${currFrom})`).then((data) => {
                resolve(data.rows[0].convert);
            }).catch((err) => {
                reject(err);
            })
        });
    }
})

module.exports = Currency;