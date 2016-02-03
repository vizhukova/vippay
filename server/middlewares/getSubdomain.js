module.exports = function(req, res, next){

    var domain = req.get('host');
    req.subdomain = domain.split('.')[0];
    req.postdomain = domain.split('.')[1] + '.' + domain.split('.')[2];
    req.hostname = domain;
    next();

};