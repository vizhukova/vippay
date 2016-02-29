var new_payment = require('./payment_systems');
var bookshelf = require('./../db');
var knex = require('./../knex_connection');
var Promise = require("bluebird");
var _ = require('lodash');


  return Promise.join(

      knex('users').select('*').then((users) => {

        return Promise.map(users, (user) => {

            var old_fields = _.pluck(user.payment, 'name');
            var new_fields = _.pluck(new_payment, 'name');
            var difference = _.difference(new_fields, old_fields);
            var payments_to_concat = _.filter(new_payment, (payment, index) => difference.indexOf(payment.name) > -1);
            var array_to_update = user.payment.concat(payments_to_concat);

            return new Promise((resolve, reject) => {
                if(difference.length == 0) {resolve();}
                else {
                    return knex('users')
                            .update({payment: JSON.stringify(array_to_update)})
                            .where({id: user.id})
                            .then((res) => {
                                resolve(res);
                            })
                            .catch((err) => {
                                reject(err);
                            })
                }
            })

        })
    })

  ).then((res) => {
    var a;
}).catch((err) => {
      var a;
  })

