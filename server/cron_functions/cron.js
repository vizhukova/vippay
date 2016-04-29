var Promise = require('bluebird');
var _ = require('lodash');
var setBankRates = require('./bank_rate/setBankRates');
var checkEndOfTariff = require('./checkEndOfTariff');
var log = require('./../utils/log');
var logg = new log('db');

/**
 * Функция для выполнения операций по расписанию
 */
(function() {

    setBankRates().then(() => {

       return checkEndOfTariff();

   }).then(() => {

       process.exit(1);

   }).catch((err) => {

       console.log(err.message);
       logg.log(err, 'error');
       process.exit(0);

   })


})();