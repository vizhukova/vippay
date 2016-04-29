/**
 * Проверка ограничений для тарифа "Бизнес"
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    if(req.clientObj.tariff_name == 'business') {

        if(req.originalUrl.indexOf("/api/basket") != -1) res.sendStatus(404);
        else if(req.originalUrl.indexOf("/api/promo") != -1) res.sendStatus(404);
        else if(req.originalUrl.indexOf("/api/staff") != -1) res.sendStatus(404);
        else next();

    } else {

        next();

    }
};