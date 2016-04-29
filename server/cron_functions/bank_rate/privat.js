var bookshelf = require('./../db');
var knex = require('./../knex_connection');
var Promise = require("bluebird");
var _ = require('lodash');
var request = require('request');

  var currency_comparison = {
      'EUR': 'EUR',
      'UAH': 'UAH',
      'USD': 'USD',
      'RUR': 'RUB'
  };

    var currency_table;
    var bank_rate;



  return (() => {
        new Promise((resolve, reject) => {

            request(' https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {

                if (!error && response.statusCode == 200) {
                    var rate = JSON.parse(body);
                    rate = rate.filter((r) => currency_comparison[r.ccy] && currency_comparison[r.base_ccy])
                    resolve(rate);
                  } else {
                    reject(error);
                }
            })

        }).then((rate) => {

            bank_rate = rate;

            return knex('currency')
                    .select('*')

        }).then((currency) => {

            currency_table = currency;
            var arr_to_insert = [];

            return Promise.map(bank_rate, (b_r) => {

                var f = _.findWhere(currency_table, { name: currency_comparison[b_r.base_ccy]} ).id;
                var t = _.findWhere(currency_table, { name: currency_comparison[b_r.ccy]} ).id;

                return knex('bank_rate')
                .insert([{
                    'from': +f,
                    'to': +t,
                    result: +b_r.buy
                }, {
                    'from': +t,
                    'to': +f,
                    result: +b_r.sale
                }])
            });

        }).then((res) => {
            var a =[]+[]*[];
        }).catch((err)=>{
            var a;
        })
  })();

