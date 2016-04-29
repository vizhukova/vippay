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

/**
 * Модель продукта
 */
var Product = bookshelf.Model.extend({

    tableName: 'products',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            'name': [{
                rule: 'required',
                message: 'Поле "продукт" обязательно для заполнения'
            }],
            'category_id': [{
                rule: 'required',
                message: 'Поле "категория" обязательно для заполнения'
            }],
            'price': [{
                rule: 'required',
                message: 'Поле "цена" обязательно для заполнения'
            }],
            'product_link': [{
                rule: 'required',
                message: 'Поле "ссылка на продукт" обязательно для заполнения'
            }],
            'currency_id': [{
                rule: 'required',
                message: 'Поле "валюта" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {

    newProduct: Promise.method(function (product) {
        var record = new this(product);
        return record.save();
    }),

    get(data) {
        return knex('products')
        .select('*')
        .where(data)
    },

    getAllProducts(id){
        return new Promise((resolve, reject) => {
            return knex('products')
                .select()
                .where({'category_id': id}).orderBy('id', 'asc')
            .then((res) => {
                resolve(replacePrice(res));
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getAllByUser(id){
        return new Promise((resolve, reject) => {
            return knex('products').where({'user_id': id, 'available': true, 'active': true})
            .orderBy('id', 'asc')
            .then((res) => {
                resolve(replacePrice(res));
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getForPartner(id){
        return new Promise((resolve, reject) => {
            return knex
            .select('products.*', 'currency.name as currency_name')
            .from('products')
            .where({'user_id': id, 'available': true})
            .join('currency', 'products.currency_id', '=', 'currency.id')
            .orderBy('id', 'asc')
            .then((res) => {
                resolve(replacePrice(res));
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getCurrentProduct(id) {
        return knex
            .first('products.*', 'currency.name as currency_name')
            .from('products')
            .where('products.id', id)
            .join('currency', 'products.currency_id', '=', 'currency.id')
    },

    getWhereIn(arrayId) {
        return knex
            .select('products.*', 'currency.name as currency_name')
            .from('products')
            .whereIn('products.id', arrayId)
            .join('currency', 'products.currency_id', '=', 'currency.id')
    },

    editProduct(product){
        return new Promise((resolve, reject) => {

            if(product.name === '' || product.price === '' || product.product_link === '') reject(new Error());
            else knex('products')
                    .where({id: product.id})
                    .update(product)
                    .returning('*')
                    .then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    })
        })
    },

    deleteProduct(id){
        return new Promise((resolve, reject) => {

            knex('products').where({id: id}).del().then((res) => {
                resolve({id: id});
            }).catch((err) => {
                reject(err);
            })

        })
    },

    newProductWithUpsell(data) {
        var product;

            return knex.transaction(function(trx) {
                knex.insert(data.product)
                    .into('products')
                    .returning('*')
                    .transacting(trx)
                    .then(function(p) {
                      product = p[0];
                      return Promise.map(data.upsells, function(upsell) {
                        upsell.upsell_id = product.id;
                        return knex.insert(upsell).into('upsell_product').transacting(trx);
                      });
                    })
                    .then(trx.commit)
                    .catch(trx.rollback);
                })
    }

});

module.exports = Product;