var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Category = bookshelf.Model.extend({

    tableName: 'categories',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            'category': [function (val) {
                return knex('categories').where('category', '=', val).then(function (resp) {
                    if (resp.length > 0) throw new Error('Такая категория уже существует')
                })
            }, {
                rule: 'required',
                message: 'Поле "категория" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {

    newCategory: Promise.method(function (categoryObj) {

        if (!categoryObj.name) throw new Error('Поле "категория" обязательна');
        var record = new this({category: categoryObj.name, user_id: categoryObj.user_id});
        return record.save();
    }),

    editCategory(category) {

        return new Promise((resolve, reject) => {
            knex('categories').where({id: category.id}).update(category).then((res) => {
                resolve(category);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getAllCategories: Promise.method(function (user_id) {
        return knex.select('id', 'category').from('categories').where({'id': user_id})
    }),

    getCurrentCategories: Promise.method(function (id) {
        return knex.first('id', 'category').from('categories').where('id', id);
    }),

    deleteCategory(id){
        return new Promise((resolve, reject) => {

            knex('categories').where({id: id}).del().then((res) => {
                resolve({id: id});
            }).catch((err) => {
                reject(err);
            })

        })
    }
})

module.exports = Category;