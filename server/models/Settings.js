var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');

var Rate = bookshelf.Model.extend({

    tableName: 'rate',

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

    getFee: Promise.method((client_id) => {
        return knex('fee').first('*').where('client_id', '=', client_id);
    }),

     editFee: Promise.method((data) => {
        return knex('fee')
                .update({value: JSON.stringify({partner_first_level: data.fee})})
                .where('client_id', '=', data.client_id)
                .returning('*')
    }),

    addFee: Promise.method((data) => {
        return knex('fee')
                .insert({value: JSON.stringify({partner_first_level: data.fee}), client_id: data.client_id})
                .returning('*')
    })

})

module.exports = Rate;