var User = require('../models/Users');
var Promise = require('bluebird');

module.exports = {

    register(user){

        return new Promise(function(resolve, reject){

            User.register(user).then(function(model){

                resolve(model.attributes);

            }).catch(function(err){

                if(err.constraint === 'users_login_unique'){

                }

                reject(err);

            })

        })

    },

    login(){

    }

};