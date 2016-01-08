var Category = require('../models/Category');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    newCategory(category){
        return new Promise(function(resolve, reject){

            Category.newCategory(category.category).then(function(model){
                resolve(model);

            }).catch(function(err){
                debugger
                console.log(err.stack)
                reject(err);
            })

        })

    },

    getAllCategories() {
        return new Promise(function(resolve, reject){

            Category.getAllCategories().then(function(model){
                resolve(model);

            }).catch(function(err){
                console.log(err.stack)
                reject(err);
            })

        })

    },

    getCurrentCategories(){}
};