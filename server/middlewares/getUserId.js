var jwt = require('jwt-simple');

/**
 * Получение id клиента
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    req.user = req.user || {};

    if(req.cookies.token){
        try{
            req.user = jwt.decode(req.cookies.token, 'secret');
        }catch(err){
            var a;
            /*res.status(401).send('Unathorized');
            return;*/
        }
    } else {
        //res.status(401).send('Unathorized');
    }

    next();

};