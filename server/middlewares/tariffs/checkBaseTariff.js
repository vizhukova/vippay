var jwt = require('jwt-simple');
var moment = require('moment');

/**
 * Проверка активности и срока всех тарифов, за исключением пробного периода
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    if( req.tariff && req.tariff.tariff_name && req.subdomain != 'payment') {

        var today = moment();
        var end_tariff = moment(req.tariff.tariff_date).add(req.tariff.tariff_duration, 'months');

        if(!req.tariff.tariff_payed || moment.max(today, end_tariff) == today) {

            if(!req.xhr){
                res.render('error')
            } else {
                res.sendStatus(403);
            }

        } else {
            next();
        }

    } else {
        next();
    }

};