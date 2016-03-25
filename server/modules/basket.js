var Basket = require('./../models/Basket');
var BasketProduct = require('./../models/BasketProduct');
var Users = require('./../models/Users');
var Currency = require('./../models/Currency');
var _ = require('lodash');

module.exports = function(req, res, next){

   var basket;
    var user;

   Basket.get({id: req.params.id, client_id: req.clientObj.id, step: 'pending'}).then((b) => {

       basket = b[0];
       if(! basket) throw new Error();
       else return  BasketProduct.getWithConvertToBaseCurr(basket.id);

   }).then((b_p) => {

       b_p.rows.map((item) => {
           if(item.product.image.indexOf('http://') == -1) {
              item.product.image = '/public/orders/images/noimage.png';
           }
       });

       req.basketItems = b_p.rows;

       return Users.getBasicCurrency({user_id: req.clientObj.id});

   }).then((u) => {

        user = u;
        return Currency.get();

   }).then((currencies) => {

       var currency = _.findWhere(currencies, {id: user.basic_currency});
        req.currency = currency;

       next();

   }).catch((err) => {

       res.status(404);
       res.render('error', { error: err });

   })

};