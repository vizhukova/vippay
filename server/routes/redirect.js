var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');
var StatisticController = require('../controllers/Statistic');


router.get('/redirect/:id', function(req, res) {
    var arr_id = req.params.id.split('-');// arr_id[0] - partner_id   arr_id[1] - product_id

    //res.send({});
    ProductController.getCurrentProduct(arr_id[1])
            .then((product) => {

                if(! req.cookies.id) {
                    CustomerController.add({partner_id: arr_id[0], product_id: arr_id[1]})
                        .then((customer) => {
                            StatisticController.add({client_id: product.user_id, partner_id: arr_id[0],product: JSON.stringify(product), customer_id: customer.id, action: "follow_link"})
                            .then(() => {
                                res.cookie('id', customer.id, {maxAge: 9000000000, httpOnly: true});
                                res.redirect(product.product_link)
                            })
                        })
                } else {
                    CustomerController.push({partner_id: arr_id[0], product_id: arr_id[1], customer_id: req.cookies.id})
                        .then((customer) => {
                            StatisticController.add({client_id: product.user_id, partner_id: arr_id[0], product: JSON.stringify(product), customer_id: customer.id, action: "follow_link"})
                            .then(() => {
                                res.redirect(product.product_link);
                            })
                        })
                }

            }).catch(function(err) {
                res.status(400).send(err.errors);
            });

});


module.exports = router;