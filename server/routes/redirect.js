var express = require('express');
var router = express.Router();
var getPartnerIdByLogin = require('../middlewares/getPartnerIdByLogin')
var ProductController = require('../controllers/Product');
var CustomerController = require('../controllers/Customer');
var StatisticController = require('../controllers/Statistic');


router.get('/redirect/:partner_login/:product_id', getPartnerIdByLogin, function (req, res)
{
    var product;
    var customer;

    ProductController.getCurrentProduct(req.params.product_id).then((p) => {

        product = p;

        if (!req.cookies.id) {
            return CustomerController.add({
                partner_id: req.partner_id,
                product_id: req.params.product_id
            })

        } else {
            return CustomerController.push({
                partner_id: req.partner_id,
                product_id: req.params.product_id,
                customer_id: req.cookies.id
            })
        }

    }).then((c) => {

        customer = c;

        return StatisticController.add({
            client_id: product.user_id,
            partner_id: req.partner_id,
            product: JSON.stringify(product),
            customer_id: customer.id,
            action: "follow_link"
        })

    }).then(() => {

        res.cookie('id', customer.id, {maxAge: 9000000000, httpOnly: true});
        res.redirect(product.product_link)

    }).catch(function (err) {

        res.status(400).send(err.errors);

    });

});


module.exports = router;