var Staff = require('../models/Staff');
var User = require('../models/Users');

module.exports = function(req, res, next){

    if(req.user.role == 'staff') {
        Staff.get({id: req.user.id}).then((staff) => {
            req.staffObj = staff[0];

            if(!req.clientObj.id) {
                return User.getById(staff[0].client_id).then((user) => {
                    req.clientObj = user;
                    next();
                })
            } else {
                next();
            }

        })
        .catch((err) => {
            next();
        })
    } else {
        next();
    }

};