var express = require('express');
var router = express.Router();
var config = require('../config');
var StaffController = require('../controllers/Staff');
var _ = require('lodash');
var jwt = require('jwt-simple');


router.post('/staff/login', function (req, res, next) {
    Object.keys(req.body).map((k) => {
        if (req.body[k] === '') req.body[k] = null
    });

    req.body.client_id = req.clientObj.id;

    StaffController.get(req.body).then((staff) => {
        var a;
        if(staff.length > 0 && staff[0].active) {
            var token = jwt.encode({id: staff[0].id, role: 'staff'}, 'secret');
            res.cookie('token', token, {maxAge: 9000000000, domain: `.${config.get('domain')}`});
            res.send({user: staff[0], redirect: `http://${req.hostname}`});
        } else {
            if(! err.constraint) err.constraint = 'check_data_staff';
                next(err);
        }
    }).catch((err) => {
        if(! err.constraint) err.constraint = 'check_data_staff';
                next(err);
    })

});


module.exports = router;