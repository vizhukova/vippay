var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');


var Staff = bookshelf.Model.extend({

    tableName: 'staff',

    hasTimestamps: true,

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

    get: Promise.method((data) => {
        return knex('staff')
                .select('*')
                .where(data)
                .orderBy('id', 'asc')
    }),

    add: Promise.method(function(data) {
        var record = new this(data);
        return record.save();
    }),

    edit: Promise.method(function(data) {
        return knex('staff')
                .update(data)
                .where('id', '=', data.id)
                .returning('*')
    }),

    remove: Promise.method(function(id) {
        return knex('staff')
                .del()
                .where('id', '=', id)
                .returning('*')
    })

});

module.exports = Staff;
