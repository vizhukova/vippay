var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');


router.post('/register', function(req, res){

    UserController.register({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    }).then(function(user){
        res.send(user)
    }).catch(function(err){
        res.send(err)
    })

});

router.get('/register', function(req, res){

    res.send('ok')

});

module.exports = router;