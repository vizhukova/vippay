var Users = require('./../models/Users');
var _ = require('lodash');
/**
 * Сбор данных для отрисовки страницы админа
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

    var perPage = 20;
    var page = req.query.page || 1;

   if(req.admin) {

       Users.getByData({}).then((users) => {

        var beginIndex = (page - 1) * perPage;

        req.adminData = {
            users: users.slice(beginIndex, beginIndex + perPage),
            action: `http://admin.${req.postdomain}/api`,
            tariffs: {
              'start': {
                  name: 'Старт',
                  prices: [
                      {time: 12, price: '2500'}
                  ]

              },
              'business': {
                name: 'Бизнес',
                  prices: [
                      {time: 3, price: '3000'},
                      {time: 6, price: '5250'},
                      {time: 12, price: '9000'}
                  ]
              },
              'magnate': {
                name: 'Магнат',
                  prices: [
                      {time: 3, price: '6000'},
                      {time: 6, price: '9000'},
                      {time: 12, price: '18000'}
                  ]
              }
            },
            tariff_names: ['start', 'business', 'magnate'],
            pages: Math.ceil(users.length / perPage),
            currentPage: page
        };
           next();

       }).catch((err) => {

         next();

       })

   } else {

       next();

   }



};