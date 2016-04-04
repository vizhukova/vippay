var Partner = require('../models/Partner');
var User = require('../models/Users');
var Product = require('../models/Product');
var PartnerClients = require('../models/PartnerClients');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    edit(fee){
        return new Promise(function(resolve, reject){

            PartnerClients.edit(fee).then(function(model){
                resolve(model);
            }).catch(function(err){
                reject(err);
            })

        })
    }
};