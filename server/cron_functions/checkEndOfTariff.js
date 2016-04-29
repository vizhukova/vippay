var Promise = require('bluebird');
var _ = require('lodash');
var moment = require('moment');
var Users = require('./../models/Users');
var email = require('./../utils/email');

var currencies;
var convertResult;

/**
 * Проверка истечения срока тарифа
 * @returns {bluebird|exports|module.exports}
 */
module.exports = function () {
    return new Promise((resolve, reject) => {

    var users;
    var endOfTrialTariff = [];
    var endOfTariff = []; // in 5 days
        console.log('emails')

    Users.getByData({}).then((u) => {

        users = u;

        users.map((user) => {

            var today = moment();

            if(! user.tariff_name) {

                var registered_day = moment(user.created_at);
                var isEnded = registered_day.diff(moment(), 'days') == -3;

                if(isEnded) {
                    endOfTrialTariff.push(user);
                }
            }

            else if(user.tariff_name && user.tariff_payed) {

                var end_day_tariff = moment(user.tariff_date).add(user.tariff_duration, 'months');
                var isSoonEnd = end_day_tariff.diff(moment(), 'days') == -5;

                if(isSoonEnd) {
                    endOfTariff.push(user);
                }

            }

        });

        endOfTrialTariff.map((user) => {

             email.send(user.email, 'Пробный период окончен', `Период пробного использования заканчивается сегодня.`);

        });

        endOfTariff.map((user) => {

             email.send(user.email, 'Срок действие тарифа истекает', `Срок действия вашего тарифа истечет через 5 дней.`);

        });

        resolve();

    }).catch((err) => {

        reject(err);

    });

});
}