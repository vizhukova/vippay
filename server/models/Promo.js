var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Promo = bookshelf.Model.extend({

    tableName: 'promo',

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            'discount': [{
                rule: 'required',
                message: 'Поле "скидка" обязательно для заполнения'
            }],
            'date': [{
                rule: 'required',
                message: 'Поле "дата" обязательно для заполнения'
            }],
            'code': [{
                rule: 'required',
                message: 'Поле "код промо акции" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {
    get(data) {
        return knex('promo')
            .where(data);
    },

    add: Promise.method(function (data) {
        var record = new this(data);
            return record.save();
    })


    }
);

module.exports = Promo;