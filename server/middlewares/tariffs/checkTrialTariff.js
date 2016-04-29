var jwt = require('jwt-simple');
var moment = require('moment');

/**
 * Проверка срока действия и активности пробного периода
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    if( req.tariff && !req.tariff.tariff_name && req.subdomain != 'payment') {
        var today = moment();
        var registered_day =  moment(req.clientObj.created_at).add(3, 'day');

        if( moment.max(today, registered_day) == today) {//if trial period end

            req.tariff.active = false;
            if(req.method != 'GET') {
                res.status(402).send(); return;
            }

        }

    }
    
    next();
};