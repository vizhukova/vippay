var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

function replaceNum(items) {
    items.map((i) => {
        i.discount = +parseFloat(i.discount)
    })
    return items;
}

/**
 * Модель промоакции
 */
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
        return new Promise((resolve, reject) => {
            return knex('promo')
            .where(data)
            .then((promos) => {
                resolve(replaceNum(promos));
            })
            .catch((err) => {
                reject(err);
            })
        })
    },

    add: Promise.method(function (data) {
        var record = new this(data);
            return record.save();
    }),

    edit(data) {
        return knex('promo')
            .update(data)
            .where({id: data.id})
            .returning('*');
    },

    delete(data) {
        return knex('promo')
            .del()
            .where(data)
            .returning('*');
    }


    }
);

module.exports = Promo;