var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');

/**
 * Модель прав доступа
 */
var Staff = bookshelf.Model.extend({

    tableName: 'acl',

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
           email: [{
                rule: 'email',
                message: 'Введите верный email'
            }]
        }).run(this.attributes);
    }

}, {

    add: Promise.method(function(data) {
        var record = new this(data);
        return record.save();
    }),

    get: Promise.method(function(data) {
        return knex('acl')
            .select('*')
            .where(data)
    }),

    edit: Promise.method(function(data) {
        return knex('acl')
            .update(data)
            .where('id', '=', data.id)
            .returning('*')
    }),

    getRoutes: Promise.method(function() {
        return knex('routes')
            .select('*')
    })
});

module.exports = Staff;
