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
        var partner_id = [];
        if(data.partner_id) partner_id.push(data.partner_id);

        var record = new this({
            partner_product_id: JSON.stringify({product_id:data.product_id,
                                                partner_id: partner_id})
        });
        return record.save();
    }),

    get(id){
        return new Promise((resolve, reject) => {
            knex.first('id', 'partner_product_id').from('customers').where('id', '=',  id)
                .then((res) => {
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
            })
            .returning(['partner_product_id', 'id']);
    }

});

module.exports = Partner;
