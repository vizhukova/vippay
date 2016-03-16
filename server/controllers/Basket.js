var Basket = require('../models/Basket');
var Promise = require('bluebird');

module.exports = {

    get(data){
        return new Promise(function (resolve, reject) {

            Basket.get(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },
    
    add(data){
        return new Promise(function (resolve, reject) {

            Basket.add(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    },
    
    edit(data){
        return new Promise(function (resolve, reject) {

            Basket.edit(data).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })

        })

    }
    
};
