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

    editCategory: Promise.method(function (categoryObj) {
        if (!categoryObj.categoryObj.name)
            throw new Error('Поле "категория" обязательна');
        /*var record = new this({category: category});
         return record.save();*/
        return knex('categories').where('id', categoryObj.categoryObj.id).update({category: categoryObj.categoryObj.name});
    }),

    getAllCategories: Promise.method(function () {
        return knex.select('id', 'category').from('categories')
    }),

    getCurrentCategories: Promise.method(function (id) {
        return knex.first('id', 'category').from('categories').where('id', id);
    }),

    deleteCategory: Promise.method(function (id) {
        return knex.first('id', 'category').from('categories').where('id', id).del();
    })
})

module.exports = Category;