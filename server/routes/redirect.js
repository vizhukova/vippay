var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');


router.get('/redirect/:id', function(req, res) {
    var arr_id = req.params.id.split('-');//arr_id[1] - product_id   arr_id[0] - partner_id

    ProductController.getCurrentProduct(arr_id[1])
            .then(function(product){

                if(! req.cookies.id) {
                    CustomerController.add(arr_id[0])
                        .then(function(customer){
                            res.cookie('id', customer.id, {maxAge: 9000000000, httpOnly: true});
                            res.redirect(product.product_link)
                        }).catch(function(err) {
                        res.status(400).send(err.errors)
                    });
                } else {
                    CustomerController.push({partner_id: arr_id[0], customer_id: req.cookies.id})
                        .then(function(customer){
                            res.redirect(product.product_link)
                        }).catch(function(err) {
                        res.status(400).send(err.errors)
                    });
                }

            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});


module.exports = router;