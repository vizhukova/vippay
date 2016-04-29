var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');

/**
 * Модель уведомления
 */
var Messages = bookshelf.Model.extend({

    tableName: 'messages',

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

        var record = new this(data);

        return record.save();
    }),

    get: Promise.method(function (user_id) {
        return knex('messages')
                .select('*')
                .where('user_id', '=', user_id)
                .andWhere({delivered: false})
    }),

    set: Promise.method(function (data) {
        return knex('messages')
                .update(data.data)
                .where('id', '=', data.id)
                .returning('*')
    })

})

module.exports = Messages;