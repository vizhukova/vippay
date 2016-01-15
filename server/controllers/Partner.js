var Partner = require('../models/Partner');
var User = require('../models/Users');
var Product = require('../models/Product');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    register(partner){

        return new Promise(function(resolve, reject){

            var errors = {};

            if(partner.password !== partner.confirm_pass){
                errors.password = ['Пароли должны совпадать'];
            }
            User.getById(partner.client_id).then(function(id){
                if(id.length == 0) reject(errors);

                Partner.register(partner).then(function(model){
                if(errors.password){
                    reject({
                        errors: errors
                    })
                }
                var token = jwt.encode({id: model.id, role: 'partner'}, 'secret');
                resolve({modelData: model.attributes, token: token});

                }).catch(function(err){
                    reject(err);
                })

            }).catch(function(err){
                reject(err);
            });
        })

    },

    login(partner){
        return new Promise(function(resolve, reject){

            var errors = {};

             //User.getById(partner.client_id).then(function(id){

                 Partner.login(partner).then(function(model){
                console.log(model)

                var token = jwt.encode({id: model.id, role: 'partner'}, 'secret');
                resolve({modelData: model.attributes, token: token});

                }).catch(function(err){
                    console.log(err.stack)
                    reject(err);
                })

            /*}).catch(function(err){
                console.log(err.stack)
                reject(err);
            })*/

        })
    },

    getAllProducts(id) {
        return new Promise(function (resolve, reject) {

            Partner.getClientId(id).then(function (id) {

                Product.getAllByUser(id.client_id).then(function (products) {
                    resolve(products);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
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
    }
};