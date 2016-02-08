var knex = require('./../knex_connection');
var Promise = require("bluebird");
var _ = require('lodash');

module.exports = function(req, res, next){

    return knex('users').select('payment').where('id', '=', req.user.id).then((payment) => {
        var interkassa = payment.indexOf({name: 'interkassa'})
        req.interkassa = interkassa;
        next();
    }).catch((err) => {
        next();
    })

};