var User = require('../models/Users');

/**
 * Получение объекта партнёра
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    if(req.user.role == 'partner') {
        User.getById(req.user.id).then((partner) => {
            req.partnerObj = partner;
             return User.get(partner.id).then((clients) => {
                    req.clientsObj = clients;
                    next();

                })
        })
        .catch((err) => {
            next();
        })
    } else {
        next();
    }

};