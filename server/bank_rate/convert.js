var express = require('express');
var request = require('request');

module.exports = function (fromCurr, toCurr){

    return new Promise((resolve, reject) => {

        var d = new Date();
        var dateStr = d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2);
        var url = 'http://www.oanda.com/lang/ru/currency/converter/update?base_currency_0=' +
            fromCurr + '&quote_currency=' +
            toCurr + '&end_date=' +
            dateStr + '&id=2&action=C';
        console.log(url);

        request({
            url: url, headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }, function (err, resp, body) {
            try {

                var data = JSON.parse(body);
                var response = data.data.bid_ask_data;
                console.log(response, "exchangeRate");
                resolve(response)

            } catch (e) {

                reject({data: {}})

            }
        })
    })

}