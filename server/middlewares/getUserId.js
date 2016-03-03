var jwt = require('jwt-simple');

module.exports = function(req, res, next){

    req.user = req.user || {};

    if(req.cookies.token){
        try{
            req.user = jwt.decode(req.cookies.token, 'secret');
        }catch(err){
            /*res.status(401).send('Unathorized');
            return;*/
        }
    }

    next();

};