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
            'category': [function(val) {
            return knex('categories').where('category', '=', val).then(function(resp) {
              if (resp.length > 0) throw new Error('Такая категория уже существует')
            })
          }, {
                rule: 'required',
                message: 'Поле "категория" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {

   newCategory: Promise.method(function (category) {

       if (!category) throw new Error('Поле "категория" обязательна');
        var record = new this({category: category});
       return record.save();
    }),

    getAllCategories: Promise.method(function () {
        return knex.select('category').from('categories')
    })
})

module.exports = Category;