var express = require('express');
var router = express.Router();

var api_prefix = '/api';

router.use(api_prefix, require('./users'));
router.use(api_prefix, require('./auth'));
router.use(api_prefix, require('./products'));
router.use(api_prefix, require('./categories'));

module.exports = router;