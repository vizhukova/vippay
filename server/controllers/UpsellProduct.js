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

    remove(data){
        return new Promise(function (resolve, reject) {

            UpsellProduct.remove(data).then(function (result) {
                resolve(result);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    getForUpsell(data){
        return new Promise(function (resolve, reject) {

            UpsellProduct.getForUpsell(data).then(function (result) {
                resolve(result.rows);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    getUpsells(data){
        return new Promise(function (resolve, reject) {

            UpsellProduct.getUpsells(data).then(function (result) {
                resolve(result);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    getForUpsellsProduct(data){
        return new Promise(function (resolve, reject) {

            UpsellProduct.getForUpsellsProduct(data).then(function (result) {
                resolve(result);

            }).catch(function (err) {
                reject(err);
            })
        })
    }


};

