var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Order = bookshelf.Model.extend({

    tableName: 'statistics',

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
        var record = new this({customer_id: data.customer_id,
                               partner_id: data.partner_id,
                               client_id: data.client_id,
                               product_id: data.product_id,
                               action: data.action
        });

        return record.save();
    }),

     get(client_id){
        return new Promise((resolve, reject) => {
            return knex('statistics').where({'client_id': client_id})
            .then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

})

module.exports = Order;