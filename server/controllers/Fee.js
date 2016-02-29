var Users = require('./../models/Users');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    getFee(client_id){
        return new Promise(function (resolve, reject) {

            Users.getFee(client_id).then(function (res) {
                resolve(res);

            }).catch(function (err) {
                reject(err);
            })
        })
    },

    editFee(data){
        return new Promise(function (resolve, reject) {

            Users.editFee(data).then((res) => {
                resolve(res[0])
            }).catch((err) => {
                reject(err)
            })

        })
    }

};