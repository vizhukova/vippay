var jwt = require('jwt-simple');
var config = require('./../config');
var UserController = require('./../controllers/User');
var StaffController = require('./../controllers/Staff');
var AclController = require('./../controllers/Acl');

module.exports = function(req, res, next){

    var userId;
    var routes;
    try{
         userId =  jwt.decode(req.cookies.token, 'secret');

        if(userId.role == 'staff') {

            return StaffController.get({
                    id: userId.id,
                    client_id: req.clientObj.id
                    }).then((staff) => {
                        if(staff.length > 0) {

                           req.staffObj =  staff[0] || {};
                           req.userObj = staff[0] || {};
                           req.clientsObj = [{id: staff[0].id, login: staff[0].login}];
                           return AclController.get({staff_id: staff[0].id});

                        } else {
                           next();
                        }
                    }).then((r) => {
                        routes = r;
                        return AclController.getRoutes();

                    }).then((entity) => {
                        req.staffObj.routes = routes || [];
                        req.entity = entity;
                        next();
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