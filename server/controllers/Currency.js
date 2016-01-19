var Currency = require('../models/Currency');
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

    }
};
