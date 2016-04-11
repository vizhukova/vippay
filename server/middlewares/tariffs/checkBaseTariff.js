var jwt = require('jwt-simple');
var moment = require('moment');

//check all tariffs except trial

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

            /*if( moment.max(today, end_tariff) == today) {//if trial period end

                req.tariff.active = false;
                if(req.method != 'GET') {
                    res.status(402).send();
            } else {
                next();
            }
        } else {
            next();
        }*/

        } else {
            next();
        }

    } else {
        next();
    }

};