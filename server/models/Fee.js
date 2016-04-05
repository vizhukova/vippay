var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

function replaceFee(fees) {
    fees.map((fee) => {
        fee.fee_payed = +parseFloat(fee.fee_payed)
        fee.fee_added = +parseFloat(fee.fee_added)
    })
    return fees;
}

var Fee = bookshelf.Model.extend({

    tableName: 'fee',

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({

        }).run(this.attributes);
    }

}, {

    set(obj) {
       return knex('fee')
        .insert(obj)
        .returning('*')
    },

    put(obj) {
        return knex('fee')
            .update(obj)
            .where('client_id', '=', obj.client_id)
            .andWhere('partner_id', '=', obj.partner_id)
            .returning('*')
    },

    get(client_id) {
        return new Promise((resolve, reject) => {
            knex('fee')
            .select('*')
            .where('client_id', '=', client_id)
            .then((res) => {
                resolve(replaceFee(res));
            }).catch((err) => {
                reject(err);
            })
        })
    }

});

module.exports = Fee;

