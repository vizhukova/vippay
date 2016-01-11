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
                console.log(model)
                if(errors.password){
                    reject({
                        errors: errors
                    })
                }
                var token = jwt.encode({id: model.id}, 'secret');
                resolve({modelData: model.attributes, token: token});

            }).catch(function(err){
                /*err.errors = err.errors || {}
                if(user.login.length == 0) { errors.name = ['Поле "логин" не может быть пустым']; }
                else if(err.constraint == "users_login_unique") {errors.name = ['Такой логин уже существует']; }
                if(user.email.length == 0) { errors.email = ['Поле "электронная почта" не может быть пустым']; }
                else if(err.constraint == "users_email_unique") {errors.email = ['Поле "электронная почта" не может быть пустой']; }
                if(user.email.password == 0) { errors.password = ['Поле "пароль" не может быть пустым']; }
                 _.assign(err.errors, errors);*/
                console.log(err.stack)
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
                /*err.errors = err.errors || {}
                 if(user.login.length == 0) { errors.name = ['Поле "логин" не может быть пустым']; }
                 else if(err.constraint == "users_login_unique") {errors.name = ['Такой логин уже существует']; }
                 if(user.email.length == 0) { errors.email = ['Поле "электронная почта" не может быть пустым']; }
                 else if(err.constraint == "users_email_unique") {errors.email = ['Поле "электронная почта" не может быть пустой']; }
                 if(user.email.password == 0) { errors.password = ['Поле "пароль" не может быть пустым']; }
                 _.assign(err.errors, errors);*/
                console.log(err.stack)
                reject(err);
            })

        })
    }

};