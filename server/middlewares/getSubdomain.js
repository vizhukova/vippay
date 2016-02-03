module.exports = function(req, res, next){

    var domain = req.get('host');
    req.subdomain = domain.split('.')[0];
    req.hostname = domain;
    next();

};