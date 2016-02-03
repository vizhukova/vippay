var User = require('../models/Users');

module.exports = function(req, res, next){

     User.getByLogin(req.params.partner_login).then((data) => {
        req.partnerId = data.id;
        next();
    })
    .catch((err) => {
        next();
    })



};