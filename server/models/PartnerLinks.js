var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

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

    get(user_id) {
        return knex('partner_links')
        .select('*')
        .where('user_id', '=', user_id)
    }

});

module.exports = PartnerLinks;