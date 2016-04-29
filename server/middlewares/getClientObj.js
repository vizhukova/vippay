var User = require('../models/Users');

/**
 * Получение объекта клиента
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    function getUser() {

        if (req.user.role == 'client') {
            return User.getById(req.user.id);
        } else {
            return User.getByLogin(req.subdomain);
        }

    }

    getUser().then((data) => {
            req.clientObj = data || {};
            next();
        })
        .catch((err) => {
            next();
        })
};