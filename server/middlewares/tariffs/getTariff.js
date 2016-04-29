var jwt = require('jwt-simple');
var Users = require('./../../models/Users');
var _ = require('lodash');

/**
 * Получение тарифа для текущего пользователя
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    req.tariff = req.tariff || {};
    req.tariff.active = true;
    var user_id = req.clientObj ? req.clientObj.id : req.user.id;

    Users.getTariff(user_id).then((result) => {

        _.assign( req.tariff, result);
        next();

    })

};