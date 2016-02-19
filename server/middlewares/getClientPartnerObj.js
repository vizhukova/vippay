var jwt = require('jwt-simple');
var config = require('./../config');
var UserController = require('./../controllers/User');

module.exports = function(req, res, next){

    var userId;
    try{
         userId =  jwt.decode(req.cookies.token, 'secret');
        return UserController.getById(userId.id).then((user) => {

            if(!user) {
                res.cookie('token', '', {maxAge: 9000000000, domain: `.${config.get('domain')}`});
                res.redirect(`http://auth.${req.postdomain}`);
                return;
            }

            req.userObj = user;

            if(user.type == 'partner') {

                return UserController.get(user.id).then((clients) => {
                    req.clientsObj = clients;
                    next();

                })
            } else {

                req.clientsObj = [{id: user.id, login: user.login}];
                next();

            }

        })

        }catch(err){
            /*res.status(401).send('Unathorized');
            return;*/
            next();
        }
};