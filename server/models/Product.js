var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Product = bookshelf.Model.extend({

    tableName: 'products',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            'name': [function (val) {
                return knex('products').where('name', '=', val).then(function (resp) {
                    if (resp.length > 0) throw new Error('Такая категория уже существует')
                })
            }, {
                rule: 'required',
                message: 'Поле "продукт" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {

    newProduct: Promise.method(function (product) {

        var record = new this(product);
        return record.save();
    }),

    getAllProducts(id){
        return new Promise((resolve, reject) => {
            return knex('products').where({'category_id': id})
            .then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }


})

module.exports = Product;