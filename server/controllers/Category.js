var Category = require('../models/Category');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    newCategory(categoryObj){
        return new Promise(function (resolve, reject) {

            Category.newCategory(categoryObj).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                debugger
                console.log(err.stack)
                reject(err);
            })

        })

    },

     editCategory(categoryObj){
        return new Promise(function (resolve, reject) {

            Category.editCategory(categoryObj.category).then(function (model) {
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
    }
};
