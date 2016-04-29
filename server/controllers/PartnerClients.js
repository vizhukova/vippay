var Partner = require('../models/Partner');
var User = require('../models/Users');
var Product = require('../models/Product');
var PartnerClients = require('../models/PartnerClients');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

/**
 * Работа со связью партнёр-клиент
 * @type {{edit: (function(*=)), get: (function(*=)), set: (function(*=))}}
 */
module.exports = {

    edit(data){
        return new Promise(function(resolve, reject){

            PartnerClients.edit(data).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

     get(data){
        return new Promise(function(resolve, reject){

            PartnerClients.get(data).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },

    set(data){
        return new Promise(function(resolve, reject){

            PartnerClients.set(data).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    },
};