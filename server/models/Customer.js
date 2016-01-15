var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Partner = bookshelf.Model.extend({

    tableName: 'customers',

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

    add: Promise.method(function (partner_id) {
        var record = new this({partner_id: [partner_id]});
        return record.save();
    }),

    get: Promise.method(function (id) {
        return knex.first('id', 'partner_id').from('customers').where('id', id);
    }),

    push(id){
        return new Promise((resolve, reject) => {
            knex.raw('update customers set partner_id = array_append(partner_id, ?) where id=? returning partner_id', [id.partner_id, id.customer_id])
            .then((res) => {
                resolve(res);
                }).catch((err) => {
                    reject(err);
                })
        })
    }

});

module.exports = Partner;