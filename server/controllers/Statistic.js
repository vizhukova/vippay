var Statistic = require('../models/Statistic');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    get(user_id) {
        return new Promise(function (resolve, reject) {

            Statistic.get(user_id).then(function(statistic) {
               resolve(statistic);
            }).catch(function(err){
               reject(err);
            });
    })
    },

    add(data) {
        return new Promise(function (resolve, reject) {

            Statistic.add(data).then(function(statistic) {
               resolve(statistic);
            }).catch(function(err){
               reject(err);
            });
    })
    }

};