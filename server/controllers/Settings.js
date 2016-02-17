var Settings = require('./../models/Settings');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    getFee(client_id){
        return new Promise(function (resolve, reject) {

            Settings.getFee(client_id).then(function (model) {
                var res = model ? model.value : {partner_first_level: ""};
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    editFee(data){
        return new Promise(function (resolve, reject) {

            Settings.getFee(data.client_id).then(function (model) {

                if(!model) {
                    Settings.addFee(data).then(function (model) {
                    resolve(model[0].value);
                    })
                } else {
                    Settings.editFee(data).then(function (model) {
                    resolve(model[0].value);
                    })
                }

            })
                .catch(function (err) {
                reject(err);
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
    }
};