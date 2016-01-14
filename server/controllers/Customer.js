var Customer = require('../models/Customer');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var _ = require('lodash');

module.exports = {

    add(partner_id) {
        return new Promise(function (resolve, reject) {

            Customer.add(partner_id).then(function (customer) {
                resolve(customer)
            }).catch(function (err) {
                reject(err);
            });
        })
    },

    push(id) {
        return new Promise(function (resolve, reject) {

            Customer.get(id.customer_id).then(function (customer) {

                if(customer.partner_id[customer.partner_id.length - 1] == id.partner_id) {
                    resolve(customer);
                    return;
                }

                Customer.push(id).then(function (customer) {
                resolve(customer)
                }).catch(function (err) {
                    reject(err);
                });

            }).catch(function (err) {
                reject(err);
            });
        })
    },

    get(id) {
        return new Promise(function (resolve, reject) {

            Customer.get(id).then(function (customer) {
                resolve(customer)
            }).catch(function (err) {
                reject(err);
            });
        })
    }


};