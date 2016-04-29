var ProductPromo = require('../models/ProductPromo');
var Promise = require('bluebird');
var _ = require('lodash');


/**
 * Работа со связью продукты-промоакции
 * @type {{add: (function(*=)), get: (function(*=)), edit: (function(*=)), delete: (function(*=))}}
 */
module.exports = {


    add(data){
        return new Promise(function (resolve, reject) {

            ProductPromo.add(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      },

    get(data){
        return new Promise(function (resolve, reject) {

            ProductPromo.get(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      },

        edit(data){
        return new Promise(function (resolve, reject) {

            ProductPromo.edit(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      },

        delete(data){
        return new Promise(function (resolve, reject) {

            ProductPromo.delete(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      }
};
