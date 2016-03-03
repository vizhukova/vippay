var User = require('../models/Users');

module.exports = function(req, res, next){

    if (req.subdomain == 'payments') {
        next();
    }

    else if (req.subdomain == 'auth' && req.user.role) {
        var link = '';
        if (req.user.role == 'client' || req.user.role == 'staff') {
            link = `http://${req.clientObj.login}.${req.postdomain}`;
        }
        else if (req.user.role == 'partner') {
            link = `http://${req.clientsObj[0].login}.${req.postdomain}/${req.partnerObj.login}`;
        }

        res.redirect(link);
    }

    else if (req.subdomain != 'auth') {

        /////////////check for partners: //////////////////////
        /*var result = _.findIndex(req.clientsObj, (item) => {
            return item.login.toLowerCase() == req.subdomain;
        });

        if(result == -1) {
         res.redirect(`http://auth.${req.postdomain}`);
         }*/
        /////////////////////////////////////////////////////
        next();

    }

    else {next();}



};