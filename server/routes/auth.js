var express = require('express');
var router = express.Router();
var UserController = require('../controllers/User');
var PartnerController = require('../controllers/Partner');

router.get('/check', function(req, res){

    if(req.user.role != req.query.role) {res.status(401).send({msg: 'not ok'}); return;}

    if(req.user.role == 'client') {
        UserController.getById(req.user.id)
                .then(function(data){
                    if(data.length == 0) {
                        res.status(401).send({msg: 'not ok'}); return;
                    }
                    res.status(200).send('ok');
                }).catch(function(err) {
                    res.status(401).send({msg: 'not ok'});
                })
    } else if(req.user.role == 'partner') {
        PartnerController.getById(req.user.id)
                .then(function(data){
                    if(data.length == 0) {
                        res.status(401).send({msg: 'not ok'}); return;
                    }
                    res.status(200).send('ok');
                }).catch(function(err) {
                    res.status(401).send({msg: 'not ok'});
                })
    }

    else res.status(401).send({msg: 'not ok'});
});


module.exports = router;