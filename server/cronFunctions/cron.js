var Promise = require('bluebird');
var _ = require('lodash');
var setBankRates = require('./bank_rate/setBankRates');
var checkEndOfTariff = require('./checkEndOfTariff');


(function() {

   return setBankRates().then(() => {

       return checkEndOfTariff();

   }).then(() => {

       var a;

   }).catch(() => {
       var a;
   })


})();