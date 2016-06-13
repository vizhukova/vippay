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

/**
 * Модель комиссии
 */
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
        obj.fee_added = obj.fee_added || 0;
        obj.fee_payed = obj.fee_payed || 0;

        return knex.raw(`
        SELECT convert(${obj.fee_added}, ${obj.client_id}, users.basic_currency, 2) AS fee_added,
        convert(${obj.fee_payed}, ${obj.client_id}, users.basic_currency, 2) AS fee_payed
        FROM users
        WHERE users.id = ${obj.client_id}
        `).then((data) => {

            var fees = data.rows[0];

            return knex('fee')
                .update({
                    client_id: obj.client_id,
                    fee_added: fees.fee_added,
                    fee_payed: fees.fee_payed,
                    partner_id: obj.partner_id
                })
                .where('client_id', '=', obj.client_id)
                .andWhere('partner_id', '=', obj.partner_id)
                .returning('*')

        })
    },

    get(client_id) {

        return new Promise((resolve, reject) => {

            knex.raw(`
             SELECT convert(fee.fee_added, ${client_id}, 2, users.basic_currency) AS fee_added,
            convert(fee.fee_payed, ${client_id}, 2, users.basic_currency) AS fee_payed,
            client_id, partner_id
            FROM users, fee
            WHERE users.id = ${client_id} AND fee.client_id = users.id
            `).then((res) => {
                resolve(replaceFee(res.rows));
            }).catch((err) => {
                reject(err);
            })

        })


        //return new Promise((resolve, reject) => {
        //    return knex('fee')
        //    .select('*')
        //    .where('client_id', '=', client_id)
        //    .then((res) => {
        //        resolve(replaceFee(res));
        //    }).catch((err) => {
        //        reject(err);
        //    })
        //})
    }

});

module.exports = Fee;

