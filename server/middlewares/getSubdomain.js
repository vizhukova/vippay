module.exports = function(req, res, next){

    var domain = req.get('host');
    req.subdomain = domain.split('.')[0];
    req.postdomain = 'vippay.loc';
    req.hostname = domain;
    next();

};