var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');


/*router.get('/register', function(req, res){
    UserController.register({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
    }).then(function(user){
        res.send(user)
    }).catch(function(err){
        res.send(err)
    })

});*/

router.post('/register', function(req, res){
    Object.keys(req.body).map((k) => {
        if(req.body[k] === '') req.body[k] = null
    })

    UserController.register({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirm_pass: req.body.confirm_pass
    }).then(function(user){
        res.send(user)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});

module.exports = router;