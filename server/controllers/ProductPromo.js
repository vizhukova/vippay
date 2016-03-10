var ProductPromo = require('../models/ProductPromo');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {


    add(data){
        return new Promise(function (resolve, reject) {

            ProductPromo.add(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      }
};
