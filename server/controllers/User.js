var User = require('../models/Users');
var Messages = require('../models/Messages');
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

            User.register(data).then(function(model){
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
    }
};