var knex = require('./../knex_connection');
var Promise = require("bluebird");
var _ = require('lodash');

/**
 * Получение id Интеркассы
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<T>|Promise}
 */
module.exports = function(req, res, next){

    return knex('users').select('payment').where('id', '=', req.user.id).then((payment) => {
        var interkassa = payment.indexOf({name: 'interkassa'})
        req.interkassa = interkassa;
        next();
    }).catch((err) => {
        next();
    })

};