var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

function replacePrice(products) {
    products.map((product) => {
        product.price = parseFloat(product.price);
    })
    return products;
}

var Product = bookshelf.Model.extend({

    tableName: 'upsell_product',

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            'price': [{
                rule: 'required',
                message: 'Поле "Цена" акции обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {

    add: Promise.method(function (data) {
        var record = new this(data);
        return record.save();
    }),

    getForUpsell: Promise.method(function (data) {
        return knex
        .select('products.*')
        .from('products')
        .join('upsell_product', 'upsell_id', '=', data.upsell_id)
        .where({'products.user_id': data.user_id});
    }),

    getForUpsellsProduct: Promise.method(function (data) {
        return knex
        .select(['products.*', 'upsell_product.price as apsell_price', 'currency.name as currency_name'])
        .from('products')
        .join('upsell_product', 'upsell_product.upsell_id', '=', 'products.id')
        .join('currency', 'currency.id', '=', 'products.currency_id')
        .where('upsell_product.product_id', '=', data.product_id)
    }),

    getUpsells(data) {
        return knex('upsell_product')
        .select('*')
        .where(data);
    }

})

module.exports = Product;