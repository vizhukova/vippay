var convert = require('./convert');
var Promise = require('bluebird');
var _ = require('lodash');
var Currency = require('./../models/Currency');
var BankRate = require('./../models/BankRate');

var currencies;
var convertResult;

(function() {

    Currency.get().then((c) => {

        currencies = c;

        return Promise.map(currencies, (fromCurr) => {

            var newCurrencies = currencies.filter((item) => item.id != fromCurr.id);

            return Promise.map(newCurrencies, (toCurr) => {

                return convert(fromCurr.name, toCurr.name);

            })

        })

    }).then((res) => {

        convertResult = res;

        return BankRate.delete({});

    }).then((res) => {

        return Promise.map(convertResult, (converts, index) => {

            var newCurrencies = currencies.filter((item) => item.id != currencies[index].id);

            return Promise.map(converts, (convert, i) => {

                return BankRate.add({
                    'from': newCurrencies[i].id,
                    'to': currencies[index].id,
                     result: convert.ask})

            })

        })

    }).then((res) => {

        var a;

    }).catch((err) => {

        var a

    })


})();