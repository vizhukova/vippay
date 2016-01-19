var express = require('express');
var router = express.Router();

var api_prefix = '/api';
var getUserId = require('../middlewares/getUserId')


router.use(getUserId);

router.use(api_prefix, require('./users'));
router.use(api_prefix, require('./partners'));
router.use(api_prefix, require('./auth'));
router.use(api_prefix, require('./products'));
router.use(api_prefix, require('./categories'));
router.use(api_prefix, require('./statistics'));
router.use(api_prefix, require('./orders'));
router.use(api_prefix, require('./settings'));
router.use(api_prefix, require('./currencies'));

module.exports = router;