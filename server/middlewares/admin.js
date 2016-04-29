var jwt = require('jwt-simple');

/**
 * Расшифровка токена админа
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    req.admin = req.admin;

    if(req.cookies.admin){
        try{
            req.admin = jwt.decode(req.cookies.admin, 'secret');

        }catch(err){

        }
    }

    next();

};