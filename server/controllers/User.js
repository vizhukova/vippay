var User = require('../models/Users');
var Messages = require('../models/Messages');
var PartnerLinks = require('../models/PartnerLinks');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');
var moment = require('moment');

module.exports = {

    register(data){
        return new Promise(function(resolve, reject){
            var errors = {};
            if(data.password !== data.confirm_pass){
                errors.password = ['Пароли должны совпадать'];
            }

            return User.register(_.omit(data, ['domain', 'confirm_pass'])).then(function(model){
                if(errors.password){
                    reject({
                        errors: errors
                    })
                }
                var token = jwt.encode({id: model.id, role: 'client'}, 'secret');

                var time = moment().add(3, 'day');

                return Messages.add({
                    user_id: model.attributes.id,
                    type: 'info',
                    text: `Ваш срок ознакомительного пользования закончится ${time.format('DD.MM.YYYY')} в ${time.format('HH:mm')}`}).then((message) => {
                    resolve({modelData: model.attributes, token: token, domain: `${model.attributes.login}.${data.domain}`});
                })


            }).catch(function(err){
                reject(err);
            })
        })
    },


    login(data){
        return new Promise(function(resolve, reject){

            var errors = {};

            User.login(data).then(function(model){

                var token = jwt.encode({id: model.id, role: 'client'}, 'secret');
                resolve({modelData: model.attributes, token: token, domain: `${model.attributes.login}.${data.domain}`});

            }).catch(function(err){
                reject(err);
            })

        })
    },

    getById(id) {
        return new Promise(function(resolve, reject){

            var errors = {};

            User.getById(id).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    getFullById(id) {
        return new Promise(function(resolve, reject){

            var errors = {};

            User.getFullById(id).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    get(partner_id) {
        return new Promise(function(resolve, reject){

            var errors = {};

            User.get(partner_id).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    setPassword(data) {
        return new Promise(function(resolve, reject){

            var errors = {};

             User.getById(data.user_id).then(function(user){
                if(user.password != data.passwords.old_pass) reject({});
                 else {
                    return User.setPassword(data).then((result) => {
                        resolve(result);
                    })
                 }
            }).catch(function(err){
                reject(err);
            })

        })
    },


    set(obj) {
         return new Promise(function(resolve, reject){

             User.set(obj).then(function(user){
               resolve(user)
            }).catch(function(err){
                reject(err);
            })

        })

    },

    activateTariff(id){

        return User.activateTariff(id)

    },

    getPartnerLink(data) {

        return new Promise(function(resolve, reject) {

            PartnerLinks.get(data).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        });

    },

    addPartnerLink(data) {

        return new Promise(function(resolve, reject) {

            PartnerLinks.add(data).then((model) => {
                resolve(model[0]);
            }).catch((err) => {
                reject(err);
            })
        });
    },

    editPartnerLink(data) {

        return new Promise(function(resolve, reject) {

            PartnerLinks.edit(data).then((model) => {
                resolve(model[0]);
            }).catch((err) => {
                reject(err);
            })
        });
    },

    removePartnerLink(id) {

        return new Promise(function(resolve, reject) {

            PartnerLinks.remove(id).then((model) => {
                resolve(model[0]);
            }).catch((err) => {
                reject(err);
            })
        });

    },

    getPayment(user_id) {
        return new Promise(function (resolve, reject) {

            User.getPayment(user_id).then(function (model) {
                resolve(model);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    putPayment(data) {
        return new Promise(function (resolve, reject) {

            User.putPayment(data).then((result) => {
                resolve(result[0]);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    setTariff(tariff) {
        return new Promise(function (resolve, reject) {

            User.setTariff(tariff).then((result) => {
                resolve(result[0]);
            }).catch((err) => {
                reject(err);
            })

        })
    },

    getTariff(user_id) {
        return new Promise(function (resolve, reject) {

            User.getTariff(user_id).then((model) => {
                resolve(model);
            }).catch((err) => {
                reject(err);
            })

        })
    }
};