var jwt = require('jwt-simple');

/**
 * Получение id клиента
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    req.client_id = req.client_id || {};

    if(req.headers.client_id){
        req.client_id = req.headers.client_id;
    }

    next();

};