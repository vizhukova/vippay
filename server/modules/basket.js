var Basket = require('./../models/Basket');
var BasketProduct = require('./../models/BasketProduct');
var Users = require('./../models/Users');
var Currency = require('./../models/Currency');
var _ = require('lodash');
/**
 * Сбор данных для отрисовки страницы корзины
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next){

   var basket;
    var user;
    var client;

   Users.getByLogin(req.subdomain).then((c) => {

       client = c;
       return Basket.get({id: +req.params.id, client_id: client.id, step: 'pending'})

   }).then((b) => {

       basket = b[0];
       if (!basket || basket.step == 'complete') throw new Error();
       else return BasketProduct.getWithConvertToBaseCurr(basket.id);

   }).then((b_p) => {

       req.basketItems = b_p.rows;

       //currency_id в массиве basketItems должно соответсвовать client.basic_currency, по скольку на главной странице валюта заказов берется по 1ому элементу этого массива
       //а в корзине все товары конвертируются в базовую валюту при выборке, currency_id и price должны соответствовать друг другу
       return Currency.convertTo(b_p.rows[0].product.price, client.id, b_p.rows[0].product.currency_id, client.basic_currency);

   }).then((data) => {

        req.basketItems[0].product.currency_id = client.basic_currency;
        req.basketItems[0].product.price = data;

        req.basketItems.map((item) => {
           if (!item.product.image || item.product.image.indexOf('http://') == -1) {
               item.product.image = '/public/orders/images/noimage.png';
               delete item.product.link_download;
           }
       });

       return Users.getBasicCurrency({user_id: client.id});

   }).then((u) => {

       user = u;
       return Currency.get();

   }).then((currencies) => {

       req.currency = _.findWhere(currencies, {id: user.basic_currency});

       next();

   }).catch((err) => {

       res.status(404);
       res.render('error', {error: err});

   })
};