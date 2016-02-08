var express = require('express');
var router = express.Router();

var api_prefix = '/api';

router.use(api_prefix, require('./users'));



router.use(api_prefix, require('./partners'));
router.use(api_prefix, require('./auth'));
router.use(api_prefix, require('./products'));
router.use(api_prefix, require('./categories'));
router.use(api_prefix, require('./statistics'));
router.use(api_prefix, require('./orders'));
router.use(api_prefix, require('./settings'));
router.use(api_prefix, require('./currencies'));
router.use(api_prefix, require('./payments'));

router.get('/iframe', function(req, res){
    res.render('iframe');
});

module.exports = router;