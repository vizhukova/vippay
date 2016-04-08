var jwt = require('jwt-simple');
var moment = require('moment');
var Users = require('./../models/Users');
var tariffSettings =  require("./tariffSettings");

module.exports = function(req, res, next){


    return new Promise((resolve, reject) => {

        if(! req.cookies.token) {

            reject(new Error('no_token'));

        } else {

            var user_token = jwt.decode(req.cookies.token, 'secret');

           Users.getById(+user_token.id).then((user) => {

               if(! user) reject(new Error('no_client'));

                else {

                    var currentTariff = {};

                   if(user.tariff_name && user.tariff_payed) {

                       currentTariff.name = user.tariff_name;
                       currentTariff.payed = user.tariff_payed;
                       currentTariff.duration = user.tariff_duration;
                       currentTariff.duration = user.tariff_duration;

                       var tariff_date = user.tariff_date;
                       var day_end = moment(tariff_date).add(user.tariff_duration, 'month');
                       var days = day_end.diff(moment(), 'days');

                       currentTariff.daysToEnd = days < 0 ? 0 : days;
                   }



                   req.tariffData = {
                       user: user,
                       tariffs: tariffSettings,
                       currentTariff: currentTariff,
                       tariffOutput: {
                           'start': `${(tariffSettings['start'].prices[0].price / tariffSettings['start'].prices[0].time).toFixed(2) } руб / мес`,
                           'business': `${tariffSettings['business'].prices[0].price / tariffSettings['business'].prices[0].time} руб / мес`,
                           'magnate': `${tariffSettings['magnate'].prices[0].price / tariffSettings['magnate'].prices[0].time} руб / мес`
                       },
                       yandex: {},
                       interkassa: {}
                   };
                   resolve();
               }

           })

        }

    }).then((data) => {

        next();

    }).catch((err) => {

       res.status(500);
       res.render('error', { error: err });

   })




};