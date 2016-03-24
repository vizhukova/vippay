var Basket = require('./../models/Basket');
var BasketProduct = require('./../models/BasketProduct');
var _ = require('lodash');

module.exports = function(req, res, next){

   var basket;

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
       next();

   }).catch((err) => {

       res.status(404);
       res.render('error', { error: err });

   })

};