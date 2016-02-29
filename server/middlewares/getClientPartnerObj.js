var jwt = require('jwt-simple');
var config = require('./../config');
var UserController = require('./../controllers/User');
var StaffController = require('./../controllers/Staff');

module.exports = function(req, res, next){

    var userId;
    try{
         userId =  jwt.decode(req.cookies.token, 'secret');

        if(userId.role == 'staff') {

            return StaffController.get({
                    id: userId.id,
                    client_id: req.clientObj.id
                    }).then((staff) => {
                        if(staff.length > 0) {

                           req.staffObj =  staff[0];
                           req.clientsObj = [{id: staff[0].id, login: staff[0].login}];
                           next();

                        } else {
                           next();
                        }
                    })

        } else {
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
        }

        }catch(err){
            /*res.status(401).send('Unathorized');
            return;*/
            next();
        }
};