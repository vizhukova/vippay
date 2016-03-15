var Basket = require('../models/Basket');
var Promise = require('bluebird');

module.exports = {

    get(){
        return new Promise(function (resolve, reject) {

            Basket.get().then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },
    
    add(){
        return new Promise(function (resolve, reject) {

            Basket.add().then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },
    
    edit(){
        return new Promise(function (resolve, reject) {

            Basket.edit().then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    }
    
};
