var jwt = require('jwt-simple');
var UserController = require('./../controllers/User');

module.exports = function(req, res, next){

    var userId;
    try{
         userId =  jwt.decode(req.cookies.token, 'secret');
        return UserController.getById(userId.id).then((user) => {
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