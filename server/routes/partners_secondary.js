var express = require('express');
var router = express.Router();
var PartnersSecondary = require('../controllers/PartnerSecondary')

router.get('/partner_secondary/:id', function (req, res, next) {
    PartnersSecondary.get(req.params.id)
        .then(function (partners) {
            res.send(partners)
        }).catch(function (err) {
            next(err);
    });
});

module.exports = router;