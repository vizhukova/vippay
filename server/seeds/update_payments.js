var new_payment = require('./../payment_systems/payment_systems');
var user_new_payment = require('./../payment_systems/user_payment_systems');
var knex = require('./../knex_connection');
var bookshelf = require('./../db');
var Promise = require("bluebird");
var _ = require('lodash');

user_new_payment.map((p) => {
      new_payment.push(p);
  });

exports.seed = function(knex, Promise) {

  return Promise.join(

       knex('users').select('*').where('type', '=', 'client').then((users) => {

        return Promise.map(users, (user) => {

            user.payment = user.payment || [];

            var old_fields = _.pluck(user.payment, 'name');
            var new_fields = _.pluck(new_payment, 'name');
            var difference = _.difference(new_fields, old_fields);
            var payments_to_del =  _.difference(old_fields, new_fields);
            var payments_to_concat = _.filter(new_payment, (payment, index) => difference.indexOf(payment.name) > -1);
            var array_to_update = user.payment.concat(payments_to_concat);
            array_to_update = _.filter(array_to_update, (index) => payments_to_del.indexOf(index.name) == -1);

            return new Promise((resolve, reject) => {
                if(!difference.length && !payments_to_del.length) {resolve();}
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

  )
};
