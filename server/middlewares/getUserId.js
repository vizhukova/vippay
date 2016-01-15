var jwt = require('jwt-simple');

module.exports = function(req, res, next){

    req.user = req.user || {};

    if(req.headers.auth){
        req.user = jwt.decode(req.headers.auth, 'secret');
    }

    next();

};