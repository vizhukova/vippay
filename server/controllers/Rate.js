var Rate = require('../models/Rate');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

/**
 * Работа с курсами валют
 * @type {{setDefault: (function(*=)), get: (function(*=)), edit: (function(*=)), getBank: (function())}}
 */
module.exports = {

    setDefault(client_id){
        return new Promise(function (resolve, reject) {

            Rate.setDefault(client_id).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    get(client_id){
        return new Promise(function (resolve, reject) {

            Rate.get(client_id).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    edit(rate) {
        return new Promise(function (resolve, reject) {

            Rate.edit(rate).then(function(rate) {
               resolve(rate);
            }).catch(function(err){
               reject(err);
            });
    })
    },

    getBank() {
        return new Promise(function (resolve, reject) {

            Rate.getBank().then(function(rate) {
               resolve(rate);
            }).catch(function(err){
               reject(err);
            });
    })
    }
};
