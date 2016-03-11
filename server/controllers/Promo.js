var Promo = require('../models/Promo');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {

    get(data){
        return new Promise(function (resolve, reject) {

            Promo.get(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

    },

    add(data){
        return new Promise(function (resolve, reject) {

            Promo.add(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      },

    edit(data){
        return new Promise(function (resolve, reject) {

            Promo.edit(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      },

    delete(data){
        return new Promise(function (resolve, reject) {

            Promo.delete(data).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })

        })

      }
};
