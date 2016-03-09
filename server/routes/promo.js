var PromoController = require('../controllers/Promo')
var express = require('express');
var router = express.Router();


router.get('/promo', function(req, res){
    PromoController.get({client_id: req.clientsObj.id}).then(function(data){
        res.send(data)
    }).catch(function(err){
        res.status(400).send(err.errors)
    })

});


module.exports = router;
