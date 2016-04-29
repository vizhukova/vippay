var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

/**
 * Модель партнёрских ссылок
 */
var PartnerLinks = bookshelf.Model.extend({

    tableName: 'partner_links',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            'key': [{
                rule: 'required',
                message: 'Поле "категория" обязательно для заполнения'
            }],

            'name': [{
                rule: 'required',
                message: 'Поле "категория" обязательно для заполнения'
            }],

            'link': [{
                rule: 'required',
                message: 'Поле "категория" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {

    get(data) {
        return knex('partner_links')
        .select('*')
        .where(data)
    },

    add(data) {
        return knex('partner_links')
               .insert(data)
               .returning('*')
    },

    edit(data) {
        return knex('partner_links')
               .update(data)
               .where('id', '=', data.id)
               .returning('*')
    },

    remove(id) {
        return knex('partner_links')
            .where({id: id})
            .del()
            .returning('*')
    }

});

module.exports = PartnerLinks;