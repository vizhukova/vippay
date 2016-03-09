var Promo = require('../models/Promo');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {

    get(data){
        return new Promise(function (resolve, reject) {

            Category.newCategory(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

    }
};
