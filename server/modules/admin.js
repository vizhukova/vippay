var Users = require('./../models/Users');
var _ = require('lodash');

module.exports = function(req, res, next){

   if(req.admin) {

       Users.getByData({}).then((users) => {

        req.users = users;
        req.actionPath =
        req.adminData = {
            users: users,
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
            tariff_names: ['start', 'business', 'magnate']
        };
           next();

       }).catch((err) => {

         next();

       })

   } else {

       next();

   }



};