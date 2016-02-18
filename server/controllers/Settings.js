var Settings = require('./../models/Settings');
var Users = require('./../models/Users');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    getFee(client_id){
        return new Promise(function (resolve, reject) {

            Users.getFee(client_id).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    editFee(data){
        return new Promise(function (resolve, reject) {

            Users.editFee(data).then((res) => {
                resolve(res[0])
            }).catch((err) => {
                reject(err)
            })

        })
    },

    getPayment(user_id) {
        return new Promise(function (resolve, reject) {

            Settings.getPayment(user_id).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    putPayment(data) {
        return new Promise(function (resolve, reject) {

            Settings.putPayment(data).then((result) => {
                resolve(result[0]);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    setTariff(tariff) {
        return new Promise(function (resolve, reject) {

            Settings.setTariff(tariff).then((result) => {
                resolve(result[0]);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    getTariff(user_id) {
        return new Promise(function (resolve, reject) {

            Settings.getTariff(user_id).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    getMessages(user_id) {
        return new Promise(function (resolve, reject) {

            Messages.get(user_id).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    setDeliveredMessages(id) {
        return new Promise(function (resolve, reject) {

            Messages.setDelivered(id).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    set(data) {
        return new Promise(function (resolve, reject) {

            User.set(id).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    }
};