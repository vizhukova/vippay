var jwt = require('jwt-simple');
var moment = require('moment');
var _ = require('lodash');
var Users = require('./../models/Users');
var tariffSettings =  require("./tariffSettings");
var Currency =  require("./../models/Currency");
var BankRate =  require("./../models/BankRate");
var Interkassa =  require("./../payments/interkassa");
var Yandex =  require("./../payments/yandex");

module.exports = function(req, res, next){

    var user;
    var currentTariff = {};
    var interkassa = {};
    var yandex = {};
    var uah;
    var rub;

    return new Promise((resolve, reject) => {

        if(! req.cookies.token) {

            reject(new Error('no_token'));

        } else {

            var user_token = jwt.decode(req.cookies.token, 'secret');

           Users.getById(+user_token.id).then((u) => {

               user = u;

               if(! user) reject(new Error('no_client'));

               resolve();

           }).catch((err) => {

               reject(new Error(err));

           })

        }

    }).then((data) => {

        return Interkassa.getServiceData(user);

    }).then((i) => {

        interkassa = i;

        return Yandex.getServiceData(user);

    }).then((y) => {

        yandex = y;
        return Currency.get();

    }).then((currencies) => {

        uah = _.findWhere(currencies, {name: 'UAH'}).id;
        rub = _.findWhere(currencies, {name: 'RUB'}).id;

        return BankRate.get({'from': rub, 'to': uah});

    }).then((toUahObj) => {

        var toUAH = toUahObj[0].result;
        var newTariffSettings = JSON.parse(JSON.stringify(tariffSettings));

        Object.keys(tariffSettings).map((tariff) => {

            tariffSettings[tariff].prices.map((priceObj, index) => {

                newTariffSettings[tariff].prices[index].price = {
                    uah: priceObj.price * toUAH,
                    rub: +priceObj.price
                }

            })

        });


        if(user.tariff_name && user.tariff_payed) {

           currentTariff.name = user.tariff_name;
           currentTariff.payed = user.tariff_payed;
           currentTariff.duration = user.tariff_duration;
           currentTariff.price = _.findWhere(newTariffSettings[user.tariff_name].prices, {time: +user.tariff_duration}).price;

           var tariff_date = user.tariff_date;
           var day_end = moment(tariff_date).add(user.tariff_duration, 'month');
           var days = day_end.diff(moment(), 'days');

           currentTariff.daysToEnd = days < 0 ? 0 : days;
        }


        req.tariffData = {
           user: user,
           tariffs: newTariffSettings,
           currentTariff: currentTariff,
           tariffOutput: {
               'start': `${(newTariffSettings['start'].prices[0].price.rub / tariffSettings['start'].prices[0].time).toFixed(2) } руб / мес`,
               'business': `${newTariffSettings['business'].prices[0].price.rub / tariffSettings['business'].prices[0].time} руб / мес`,
               'magnate': `${newTariffSettings['magnate'].prices[0].price.rub / tariffSettings['magnate'].prices[0].time} руб / мес`
           },
           yandex: yandex,
           interkassa: interkassa
       };

        next();

    }).catch((err) => {

       res.status(500);
       res.render('error', { error: err });

   })




};