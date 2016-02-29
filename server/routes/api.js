var express = require('express');
var router = express.Router();

var api_prefix = '/api';

var getTariff = require('./../middlewares/tariffs/getTariff');
var checkTrialTariff = require('./../middlewares/tariffs/checkTrialTariff');
var checkBaseTariff = require('./../middlewares/tariffs/checkBaseTariff');

router.use(api_prefix, require('./payments'));

var checkStartTariff = require('./../middlewares/tariffs/checkStartTariff');
router.use(api_prefix, require('./auth'));
router.use(api_prefix, require('./log'));
router.use(api_prefix, require('./users'));
router.use(api_prefix, require('./partners'));
router.use(api_prefix, require('./staff'));

router.use(api_prefix, require('./messages'));

router.use(api_prefix, require('./messages'));
router.use(getTariff);

router.use(api_prefix, require('./settings'));

router.use(checkTrialTariff);
router.use(checkBaseTariff);

router.use(checkStartTariff);
router.use(api_prefix, require('./products'));
router.use(api_prefix, require('./categories'));
router.use(api_prefix, require('./statistics'));
router.use(api_prefix, require('./orders'));
router.use(api_prefix, require('./currencies'));

module.exports = router;