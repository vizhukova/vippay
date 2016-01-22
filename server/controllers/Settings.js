var Settings = require('./../models/Settings');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    editRate(rate) {
        return new Promise(function (resolve, reject) {

            Settings.editRate(rate).then(function(rate) {
               resolve(rate);
            }).catch(function(err){
               reject(err);
            });
    })
    }
};