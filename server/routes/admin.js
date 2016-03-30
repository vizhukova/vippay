var express = require('express');
var router = express.Router();
var config = require('../config');
var _ = require('lodash');
var jwt = require('jwt-simple');

var User = require('./../models/Users');


router.post('/admin/login', function (req, res, next) {

    if(req.body.password !== '12345') {

        res(400).send();

    }
    else {

        res.cookie('admin', jwt.encode(true, 'secret'), {maxAge: 9000000000, domain: `.${config.get('domain')}`});
        res.send({redirect: `http://admin.${req.postdomain}/admin`});

    }

});

router.post('/admin/user/login', function (req, res, next) {

    var id = +req.body.id;
    var user;

    User.getByData({id: id}).then((u) => {

        user = u[0];

        res.cookie('token', jwt.encode({id: user.id, role: user.type}, 'secret'), {maxAge: 9000000000, domain: `.${req.postdomain}`});
        res.redirect(`http://${user.login}.${req.postdomain}`);

    }).catch((err) => {

        next(err);

    })

});




module.exports = router;