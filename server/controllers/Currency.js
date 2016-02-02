var Currency = require('../models/Currency');
var User = require('../models/Users');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    get(){
        return new Promise(function (resolve, reject) {

            Currency.get().then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },

    getBasic(data){
        return new Promise(function (resolve, reject) {

            User.getBasicCurrency(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },

    setBasic(data){
        return new Promise(function (resolve, reject) {

            User.setBasicCurrency(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    }
};
