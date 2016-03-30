var jwt = require('jwt-simple');

module.exports = function(req, res, next){

    req.admin = req.admin;

    if(req.cookies.admin){
        try{
            req.admin = jwt.decode(req.cookies.admin, 'secret');
            next();
        }catch(err){
            next();
        }
    }



};