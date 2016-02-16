var config = require('./../config');
var auth_domain = config.get('auth_domain');
var express = require('express');
var router = express.Router();
var MessagesController = require('../controllers/Messages');
var _ = require('lodash');


router.get('/messages', function(req, res) {
    MessagesController.get(req.user.id).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.errors)
    })

});

router.put('/messages/:id', function(req, res) {
    MessagesController.set({id: req.params.id, data: req.body}).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send(err.errors)
    })

});



module.exports = router;
