var Staff = require('./../models/Staff');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    get(data) {
        return new Promise(function (resolve, reject) {

            Staff.get(data).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    add(data) {
        return new Promise(function (resolve, reject) {

            Staff.add(data).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    edit(data) {
        return new Promise(function (resolve, reject) {

            Staff.edit(data).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    remove(id) {
        return new Promise(function (resolve, reject) {

            Staff.remove(id).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    }

};