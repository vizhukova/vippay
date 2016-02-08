var new_payment = require('./payment_systems');
var bookshelf = require('./../db');
var knex = require('./../knex_connection');
var Promise = require("bluebird");
var _ = require('lodash');


knex('users').select('*').then((users) => {

        return Promise.map(users, (user) => {

            var old_fields = _.pluck(user.payment, 'name');

            var new_fields = _.pluck(new_payment, 'name');

            var difference = _.difference(new_fields, old_fields);

            var payments_to_concat = _.filter(new_payment, (payment, index) => difference.indexOf(payment.name) > -1);

            var array_to_update = old_fields.concat(payments_to_concat);

            return knex('users').update({payment: JSON.stringify(array_to_update)}).where({id: user.id});

        })
    })

    .then(() => process.exit(0))

    .catch((err) => {
        process.exit(1)
    });
