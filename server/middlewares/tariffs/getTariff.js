var jwt = require('jwt-simple');
var Users = require('./../../models/Users');
var _ = require('lodash');

module.exports = function(req, res, next){

    req.tariff = req.tariff || {};
    req.tariff.active = true;
    var user_id = req.clientObj ? req.clientObj.id : req.user.id;

    Users.getTariff(user_id).then((result) => {

        _.assign( req.tariff, result);
        next();

    })

};