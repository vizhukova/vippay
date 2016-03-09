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

    get(data){
        return new Promise(function (resolve, reject) {

            Product.get(data).then(function (products) {
                resolve(products);

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
    },

    newProductWithUpsell(data) {
        return new Promise(function (resolve, reject) {

            Product.newProductWithUpsell(data).then(function (product) {
                resolve(product);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    getWhereIn(arrayId) {
        return new Promise(function (resolve, reject) {

            Product.getWhereIn(arrayId).then(function (products) {
                resolve(products);

            }).catch(function (err) {
                reject(err);
            })
        })
    }
};

