var Partner = require('../models/Partner');
var User = require('../models/Users');
var Product = require('../models/Product');
var Fee = require('../models/Fee');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

/**
 * Работа с партнёрами
 * @type {{register: (function(*=)), login: (function(*=)), guestLogin: (function(*=)), getAllProducts: (function(*)), getAll: (function(*=)), getById: (function(*=)), edit: (function(*=)), get: (function(*=)), getFee: (function(*=)), putFee: (function(*=)), setFee: (function(*=))}}
 */
module.exports = {

    register(partner){

        return new Promise(function(resolve, reject){

            var errors = {};

            if(partner.password !== partner.confirm_pass){
                errors.password = ['Пароли должны совпадать'];
            }

                return Partner.register(partner).then(function(model){
                if(errors.password){
                    reject({
                        errors: errors
                    })
                }

                    var token = jwt.encode({id: model.id, role: 'partner'}, 'secret');
                    resolve({modelData: model, token: token});

                }).catch(function(err){
                reject(err);
            });
        })

    },

    login(partner){
        return new Promise(function (resolve, reject) {
            var model;
            var errors = {};

            Partner.login(partner).then(function (m) {
                model = m;

                return User.getByLogin(partner.referer);

            }).then((referer) => {

                return Partner.setReferrer({user_id: model.id, client_id: partner.client_id});

            }).then(() => {

                return Partner.bindWithClient({client_id: partner.client_id, partner_id: model.id})

            }).then(() => {
                var token = jwt.encode({id: model.id, role: 'partner'}, 'secret');
                resolve({modelData: model.attributes, token: token});
            }).catch((err) => {

                if (err.constraint == "clients-partners_pkey") {
                    var token = jwt.encode({id: model.id, role: 'partner'}, 'secret');
                    resolve({modelData: model.attributes, token: token});
                } else {
                    reject(err);
                }

            })


        })
    },

    guestLogin(login){
        return new Promise(function(resolve, reject){

            var errors = {};

                 Partner.guestLogin(login).then(function(model){
                console.log(model);

                var token = jwt.encode({id: model.id, role: 'partner'}, 'secret');
                resolve({modelData: model.attributes, token: token});

                }).catch(function(err){
                    console.log(err.stack);
                    reject(err);
                });

        })
    },

    getAllProducts(data) {
        return new Promise(function (resolve, reject) {

                Product.getForPartner(data).then(function (products) {
                    resolve(products);
                })
            }).catch(function (err) {
                reject(err);
        })
    },

    getAll(id) {
        return new Promise(function (resolve, reject) {

            Partner.getAll(id).then(function (partners) {
                resolve(partners)
            }).catch(function (err) {
                reject(err);
            });
        })
    },

    getById(id) {
        return new Promise(function(resolve, reject){

            var errors = {};

            Partner.getById(id).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    getReferer(id){
        return new Promise(function(resolve, reject){

            Partner.getReferer(id).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    edit(partner) {
        return new Promise(function(resolve, reject){

            var errors = {};
            Partner.edit(partner).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    get(id) {
        return new Promise(function(resolve, reject){

            var errors = {};

            Partner.get(id).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    getFee(client_id) {
        return new Promise(function(resolve, reject){

            Fee.get(client_id).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    putFee(fee){
        return new Promise(function(resolve, reject){

            Fee.put(fee).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    setFee(fee){
        return new Promise(function(resolve, reject){

            Fee.set(fee).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    }
};