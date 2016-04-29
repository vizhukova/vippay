var Acl = require('./../models/Acl');
var Promise = require('bluebird');
var _ = require('lodash');

/**
 * Управление правами доступа
 * @type {{add: (function(*=)), get: (function(*=)), edit: (function(*=)), getRoutes: (function())}}
 */
module.exports = {

    add(data) {
        return new Promise(function (resolve, reject) {

            Acl.add(data).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    get(data) {
        return new Promise(function (resolve, reject) {

            Acl.get(data).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    edit(data) {
        return new Promise(function (resolve, reject) {

            Acl.edit(data).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    getRoutes() {
        return new Promise(function (resolve, reject) {

            Acl.getRoutes().then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    }
};