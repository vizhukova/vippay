var User = require('../models/Users');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    register(user){
        return new Promise(function(resolve, reject){
            var errors = {};
            if(user.password !== user.confirm_pass){
                errors.password = ['Пароли должны совпадать'];
            }
            User.register(user).then(function(model){
                if(errors.password){
                    reject({
                        errors: errors
                    })
                }
                var token = jwt.encode({id: model.id}, 'secret');
                resolve({modelData: model.attributes, token: token});

            }).catch(function(err){
                reject(err);
            })
        })
    },


    login(user){
        return new Promise(function(resolve, reject){

            var errors = {};

            User.login(user).then(function(model){
                console.log(model)

                var token = jwt.encode(model.id, 'secret');
                resolve({modelData: model.attributes, token: token});

            }).catch(function(err){
                console.log(err.stack)
                reject(err);
            })

        })
    }

};