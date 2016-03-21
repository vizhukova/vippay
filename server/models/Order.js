var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');

function replacePrice(orders) {
    orders.map((order) => {
        order.product.price = +parseFloat(order.product.price)
    })
    return orders;
}

function perCent(price, discount) {
    return price  - (price * discount / 100);
}

var Order = bookshelf.Model.extend({

    tableName: 'orders',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({

        }).run(this.attributes);
    }

}, {

    get: Promise.method(function (client_id) {
        return new Promise((resolve, reject) => {
            knex.select(knex.raw(`orders.*,
              (SELECT users.name from users WHERE users.id = orders.partner_id),
              (SELECT users.login from users WHERE users.id = orders.partner_id),
              (SELECT users.email from users WHERE users.id = orders.partner_id)`))
            .from('orders')
            .where('orders.client_id', client_id)
            .orderBy('id', 'desc')
            .then((res) => {
                resolve(replacePrice(res));
            }).catch((err) => {
                reject(err);
            })
        })

    }),

    setComplete: Promise.method(function (data) {
        return knex('orders')
        .update({step: data.step})
        .where('id', '=', data.id)
        .returning('*')
    }),

    getById: Promise.method(function (id) {
        return knex('orders')
                .first()
                .where('orders.id', id)
    }),

    add: Promise.method(function (data) {
        data.delivery = data.delivery || {};
        var partnerId = data.customer.partner_product_id.partner_id;
        var lastPartnerId = partnerId ? partnerId[partnerId.length - 1] : null;
        var delivery_price = data.delivery.price ? (data.isPromo ? ( perCent(data.delivery.price, data.discount) ) : parseFloat(data.delivery.price) ) : 0;
        var product_price = data.delivery.total - delivery_price;
        var product  = data.product;
        var convert = parseFloat(data.convert);

        /*var product_price = data.delivery.total;
        /*_.filter(data.products, (item) => item.id != product.id).map((prod) => {
            product_price += parseFloat(prod.price);
        })

        product_price += data.isPromo ? perCent(product.price, data.discount) : parseFloat(product.price);*/


        var record = new this({customer_id: data.customer.id,
                               partner_id: lastPartnerId,
                               client_id: product.user_id,
                               product_id: product.id,
                               basic_currency: data.basic_currency,
                               product: JSON.stringify(data.products),
                               step: "pending",
                               delivery: JSON.stringify(data.delivery),
                               product_price_order_rate: product_price,
                               product_price_base_rate: product_price * data.convert,
                               delivery_price_order_rate: delivery_price,
                               delivery_price_base_rate: delivery_price * data.convert,
                               total_price_order_rate: delivery_price + product_price,
                               total_price_base_rate: (delivery_price + product_price) * data.convert,
                               basic_currency_id: data.basic_currency_id,
                               isPromo: data.isPromo,
                               discount: data.discount,
                               promo_code: data.promo_code
        });

        return record.save();
    }),

    pay(id){
            return knex('orders')
            .update({'step': 'complete'})
            .where('id', id)
            .returning('*');
    },

    edit(data) {
        return knex('orders')
            .update(data)
            .where('id', '=', data.id)
            .returning('*')
    }

})

module.exports = Order;