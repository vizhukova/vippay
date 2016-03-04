var UpsellProduct = require('../models/UpsellProduct');
var Promise = require('bluebird');

module.exports = {


    add(data){
        return new Promise(function (resolve, reject) {

            UpsellProduct.add(data).then(function (result) {
                resolve(result);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    getForUpsell(data){
        return new Promise(function (resolve, reject) {

            UpsellProduct.getForUpsell(data).then(function (result) {
                resolve(result);

            }).catch(function (err) {
                reject(err);
            })
        })
    }



};

