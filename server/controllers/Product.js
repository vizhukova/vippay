var Product = require('../models/Product');
var Promise = require('bluebird');

module.exports = {

    newProduct(product){
        return new Promise(function (resolve, reject) {

            Product.newProduct(product).then(function (model) {
                resolve(model.attributes);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    getAllProducts(id) {
        return new Promise(function (resolve, reject) {

            Product.getAllProducts(id).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })
        })
    }
};

