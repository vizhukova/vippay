var jwt = require('jwt-simple');

module.exports = function(req, res, next){

    req.user = req.user || {};

    if(req.headers.auth){
        try{
            req.user = jwt.decode(req.headers.auth, 'secret');
        }catch(err){
            res.status(401).send('Unathorized');
            return;
        }
    }

    next();

};