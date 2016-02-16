var Messages = require('./../models/Messages');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    get(user_id) {
        return new Promise(function (resolve, reject) {

            Messages.get(user_id).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    set(data) {
        return new Promise(function (resolve, reject) {

            Messages.set(data).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    }
};