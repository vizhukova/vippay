var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

/**
 * Модель связи продукт-промоакция
 */
var ProductPromo = bookshelf.Model.extend({

    tableName: 'product_promo',

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({

        }).run(this.attributes);
    }

}, {
        get(data) {
            return knex('product_promo')
            .where(data);
        },

        add(data) {
            return knex('product_promo')
                .insert(data);
        },

        delete(data) {
            return knex('product_promo')
                .del()
                .where(data);
        }

    }
);

module.exports = ProductPromo;