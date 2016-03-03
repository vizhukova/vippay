var User = require('../models/Users');

module.exports = function(req, res, next){

     User.getByLogin(req.subdomain).then((data) => {
        req.clientObj = data || {};
         next();
    })
    .catch((err) => {
        next();
    })



};