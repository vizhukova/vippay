var User = require('../models/Users');

/**
 * Получение id партнёра
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

     User.getByLogin(req.params.partner_login).then((data) => {
        req.partnerId = data.id;
        next();
    })
    .catch((err) => {
        next();
    })



};