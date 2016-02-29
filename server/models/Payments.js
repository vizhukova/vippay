var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');
var moment = require('moment');

var Rate = bookshelf.Model.extend({

    tableName: 'staff',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            email: [{
                rule: 'required',
                message: 'Поле "логин" обязательно для заполнения'
            }, {
                rule: 'email',
                message: 'Введите верный email'
            }],
            login: [{
                rule: 'required',
                message: 'Поле "логин" обязательно для заполнения'
            }],
            password:[{
                rule: 'required',
                message: 'Поле "пароль" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {




})

module.exports = Rate;