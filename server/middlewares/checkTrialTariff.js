var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function(req, res, next){

    if(! req.tariff.tariff_name) {
        var today = moment();
        var registered_day =  moment(req.clientObj.created_at).add(3, 'day');

        if( moment.max(today, registered_day) == today) {//if trial period end
            if(req.method != 'GET') {res.status(402).send(); return;}
        }

    }
    
    next();
};