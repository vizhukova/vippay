var express = require('express');
var router = express.Router();

var api_prefix = '/api';


/*router.use(function(req, res, next){


    var token = '';
    var id='';

    res.status(401).send({});

    req.user_id = id;
    next();


})*/

router.use(api_prefix, require('./users'));
router.use(api_prefix, require('./auth'));
router.use(api_prefix, require('./products'));
router.use(api_prefix, require('./categories'));

module.exports = router;