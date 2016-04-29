var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

/**
 * Модель связи партнёр-клиент
 */
var PartnerCliets = bookshelf.Model.extend({

    tableName: 'clients-partners',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit().run(this.attributes);
    }

}, {

    edit(data) {
        return knex('clients-partners')
            .update(data)
            .where({client_id: data.client_id, partner_id: data.partner_id})
            .returning('*');
    },

    get(data) {
        return knex('clients-partners')
            .select('*')
            .where(data);
    },

    set(data) {
        return knex('clients-partners')
            .insert(data)
            .returning('*');
    }


});

module.exports = PartnerCliets;
