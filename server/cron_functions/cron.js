var Promise = require('bluebird');
var _ = require('lodash');
var setBankRates = require('./bank_rate/setBankRates');
var checkEndOfTariff = require('./checkEndOfTariff');


(function() {

    setBankRates().then(() => {

       return checkEndOfTariff();

   }).then(() => {

       process.exit(1);

   }).catch(() => {

       process.exit(0);

   })


})();