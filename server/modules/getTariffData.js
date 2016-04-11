var jwt = require('jwt-simple');
var moment = require('moment');
var _ = require('lodash');
var Users = require('./../models/Users');
var tariffSettings =  require("./tariffSettings");
var Interkassa =  require("./../payments/interkassa");
var Yandex =  require("./../payments/yandex");

module.exports = function(req, res, next){

    var user;
    var currentTariff = {};
    var interkassa = {};

    return new Promise((resolve, reject) => {

        if(! req.cookies.token) {

            reject(new Error('no_token'));

        } else {

            var user_token = jwt.decode(req.cookies.token, 'secret');

           Users.getById(+user_token.id).then((u) => {

               user = u;

               if(! user) reject(new Error('no_client'));

                else {

                   if(user.tariff_name && user.tariff_payed) {

                       currentTariff.name = user.tariff_name;
                       currentTariff.payed = user.tariff_payed;
                       currentTariff.duration = user.tariff_duration;
                       currentTariff.price = _.findWhere(tariffSettings[user.tariff_name].prices, {time: +user.tariff_duration}).price;

                       var tariff_date = user.tariff_date;
                       var day_end = moment(tariff_date).add(user.tariff_duration, 'month');
                       var days = day_end.diff(moment(), 'days');

                       currentTariff.daysToEnd = days < 0 ? 0 : days;
                   }

                   resolve();
               }

           })

        }

    }).then((data) => {

        return Interkassa.getServiceData(user);

    }).then((i) => {

        interkassa = i;

        return Yandex.getServiceData(user);

    }).then((yandex) => {

        req.tariffData = {
           user: user,
           tariffs: tariffSettings,
           currentTariff: currentTariff,
           tariffOutput: {
               'start': `${(tariffSettings['start'].prices[0].price / tariffSettings['start'].prices[0].time).toFixed(2) } руб / мес`,
               'business': `${tariffSettings['business'].prices[0].price / tariffSettings['business'].prices[0].time} руб / мес`,
               'magnate': `${tariffSettings['magnate'].prices[0].price / tariffSettings['magnate'].prices[0].time} руб / мес`
           },
           yandex: yandex,
           interkassa: interkassa
       };

    }).then((data) => {

        next();

    }).catch((err) => {

       res.status(500);
       res.render('error', { error: err });

   })




};