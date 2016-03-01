var _ = require('lodash');

module.exports = function(req, res, next){
    if(req.user.role == 'staff' && req.method != 'GET') {
        var a;
        var url = req.url.split('/')[2];
        var route = _.findWhere(req.entity, {route: url}) || {};
        var result =  _.findWhere(req.staffObj.routes, {route: route.entity}) || {};

        if(! result || result.action !== 'write') res.status(402).send();
        else next();
    } else {
        next();
    }
};