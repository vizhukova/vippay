var jwt = require('jwt-simple');
var Settings = require('./../../models/Settings');
var _ = require('lodash');

module.exports = function(req, res, next){

    req.tariff = req.tariff || {};
    req.tariff.active = true;
    var user_id = req.clientObj ? req.clientObj.id : req.user.id;

    Settings.getTariff(user_id).then((result) => {

        _.assign( req.tariff, result);
        next();

    })

};