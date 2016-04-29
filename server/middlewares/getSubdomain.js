var config = require('./../config');

/**
 * Получение сабдомена
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    var domain = req.get('host');
    req.subdomain = domain.split('.')[0];
    req.postdomain = config.get('domain');
    req.hostname = domain;
    next();

};