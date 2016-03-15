var Rate = require('../models/Rate');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

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

    getBank(rate) {
        return new Promise(function (resolve, reject) {

            Rate.getBank(rate).then(function(rate) {
               resolve(rate);
            }).catch(function(err){
               reject(err);
            });
    })
    }
};
