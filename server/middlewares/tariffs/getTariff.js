var jwt = require('jwt-simple');
var Settings = require('./../../models/Settings');

module.exports = function(req, res, next){

    req.tariff = req.tariff || {};

    Settings.getTariff(req.user.id).then((result) => {
        req.tariff = result;
        next();
    })

};