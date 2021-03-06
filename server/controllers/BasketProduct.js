var BasketProduct = require('../models/BasketProduct');
var Promise = require('bluebird');

/**
 * Работа с продуктами в корзине
 * @type {{get: (function(*=)), add: (function(*=)), edit: (function(*=)), delete: (function(*=)), getWithConvertToBaseCurr: (function(*=))}}
 */
module.exports = {

    get(data){
        return new Promise(function (resolve, reject) {

            BasketProduct.get(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },
    
    add(data){
        return new Promise(function (resolve, reject) {

            BasketProduct.add(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },
    
    edit(data){
        return new Promise(function (resolve, reject) {

            BasketProduct.edit(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },

    delete(data){
        return new Promise(function (resolve, reject) {

            BasketProduct.delete(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },

    getWithConvertToBaseCurr(basket_id){
        return new Promise(function (resolve, reject) {

            BasketProduct.getWithConvertToBaseCurr(basket_id).then(function (model) {
                resolve(model.rows);

            }).catch(function (err) {
                reject(err);
            })

        })

    }
    
};
