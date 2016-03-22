var Product = require('./../models/Product');
var Currency = require('./../models/Currency');
var UpsellProduct = require('./../models/UpsellProduct');
var _ = require('lodash');

module.exports = function(req, res, next){

    var currency;
    var product;
    var upsell_products;

     Product.get({id: req.params.id}).then((p) => {

         product = p[0];
         product.delivery = product.delivery || [];

         if(product.image.indexOf('http://') == -1) {
              product.image = '/public/orders/images/noimage.png';
         }

         return Currency.get();

     }).then((currencies)=> {

           currency = _.findWhere(currencies, {id: product.currency_id});

         return new Promise((resolve, reject) => {

             if(product.isUpsell) {
                 return UpsellProduct.getForUpsell({upsell_id: product.id}).then((u_p) => resolve(u_p));
             } else {
                 resolve([]);
             }

         })

     }).then((products) => {

         var total = product.delivery.length ? parseFloat(product.price) + parseFloat(product.delivery.price) : parseFloat(product.price);

         upsell_products = products;

         req.pending = {
             currency: currency,
             product: product,
             upsell_products: upsell_products,
             total: total.toFixed(2),
             formSettings: {
                 method: 'POST',
                 action: `http://${req.clientObj.login}.${req.postdomain}/api/order`
             }
         };

         next();


     }).catch((err) => {

         var a;

     })

};