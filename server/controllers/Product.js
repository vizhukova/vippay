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
    },

    getCurrentProduct(id) {
        return new Promise(function (resolve, reject) {

            Product.getCurrentProduct(id).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    editProduct(product) {
        return new Promise(function (resolve, reject) {

            Product.editProduct(product).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    deleteProduct(id) {
        return new Promise(function (resolve, reject) {

            Product.deleteProduct(id).then(function (id) {
                resolve(id);

            }).catch(function (err) {
                reject(err);
            })
        })
    }
};
