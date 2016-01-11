var Category = require('../models/Category');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    newCategory(categoryObj){
        return new Promise(function (resolve, reject) {

            Category.newCategory(categoryObj).then(function (model) {
                resolve(model.attributes);

            }).catch(function (err) {
                debugger
                console.log(err.stack)
                reject(err);
            })

        })

    },

     editCategory(category){
        return new Promise(function (resolve, reject) {

            Category.editCategory(category).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                console.log(err.stack)
                reject(err);
            })

        })

    },

    getAllCategories() {
        return new Promise(function (resolve, reject) {

            Category.getAllCategories().then(function (model) {
                resolve(model);

            }).catch(function (err) {
                console.log(err.stack)
                reject(err);
            })

        })

    },

    getCurrentCategories(id){
        return new Promise(function (resolve, reject) {
            Category.getCurrentCategories(id).then(function (category) {
                resolve(category);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

     deleteCategory(id) {
        return new Promise(function (resolve, reject) {
            Category.deleteCategory(id).then(function (category) {
                resolve(category);

            }).catch(function (err) {
                reject(err);
            })
        })
     }

};
