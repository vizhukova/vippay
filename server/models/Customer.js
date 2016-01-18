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

    add: Promise.method(function (data) {
        var record = new this({
            partner_product_id: JSON.stringify({product_id:data.product_id,
                                                partner_id: [data.partner_id]})
        });
        return record.save();
    }),

    get(id){
        return new Promise((resolve, reject) => {
            knex.first('id', 'partner_product_id').from('customers').where('id', id).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            });
        })

    },

    edit(id, data) {
        return knex('customers')
            .where('id', '=', id)
            .update({
               partner_product_id: JSON.stringify(data)
            });
    },

    push(data){
        return new Promise((resolve, reject) => {
            knex.raw('update customers set partner_product_id = array_append(partner_product_id, ?) where id=? returning partner_product_id',
                [JSON.stringify({partner_id: data.partner_id, product_id: data.product_id})
                    , data.customer_id])
            .then((res) => {
                resolve(res);
                }).catch((err) => {
                    reject(err);
                })
        })
    }

});

module.exports = Partner;
