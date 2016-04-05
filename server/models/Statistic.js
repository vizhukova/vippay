var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Order = bookshelf.Model.extend({

    tableName: 'statistics',

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

    add: function (data) {
        var record = new this({customer_id: data.customer_id,
                               partner_id: data.partner_id,
                               client_id: data.client_id,
                               product: data.product,
                               action: data.action,
                               order_id: data.order_id || null
        });

        return record.save();
    },

    edit(data) {

        return knex('statistics')
            .update(data)
            .where({order_id: data.order_id});

    },

     get(client_id){
        return new Promise((resolve, reject) => {

             knex.select(knex.raw(`
              (SELECT COUNT(id) as count_follow_link from statistics WHERE client_id = ${client_id} AND action = 'follow_link'),
              (SELECT COUNT(id) as count_start_order from statistics WHERE client_id = ${client_id} AND action = 'start_order'),
              (SELECT COUNT(id) as count_pending_order from statistics WHERE client_id = ${client_id} AND action = 'pending_order'),
              (SELECT COUNT(id) as count_complete_order from statistics WHERE client_id = ${client_id} AND action = 'complete_order'),
              (SELECT SUM( convertToBaseCurrency((orders.total_price_order_rate)::NUMERIC, ${client_id}, (orders.product->0->>'currency_id')::INTEGER) ) AS sum_pending_order FROM orders WHERE step = 'pending' AND client_id = ${client_id}),
              (SELECT SUM( convertToBaseCurrency((orders.total_price_order_rate)::NUMERIC, ${client_id}, (orders.product->0->>'currency_id')::INTEGER) ) AS sum_complete_order FROM orders WHERE step = 'complete' AND client_id = ${client_id}),
              (SELECT SUM(fee_added::NUMERIC) as sum_fee_added from fee WHERE client_id = ${client_id}),
              (SELECT SUM(fee_payed::NUMERIC) as sum_fee_payed from fee WHERE client_id = ${client_id})
              `))
                .then((res) => {
                    res[0].sum_pending_order = parseFloat(res[0].sum_pending_order || 0).toFixed(2);
                    res[0].sum_complete_order = parseFloat(res[0].sum_complete_order || 0).toFixed(2);
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                })
        })
    },

    getAll(data) {
        return knex('statistics')
            .select('*')
            .where(data);
    },

    delete(data) {
        return knex('statistics')
            .del()
            .where(data);
    },

    getByPartner(data){
        return new Promise((resolve, reject) => {

             knex.select(knex.raw(`
              (SELECT COUNT(id) as count_follow_link from statistics WHERE client_id = ${data.client_id} AND partner_id = ${data.partner_id} AND action = 'follow_link'),
              (SELECT COUNT(id) as count_start_order from statistics WHERE client_id = ${data.client_id} AND partner_id = ${data.partner_id} AND action = 'start_order'),
              (SELECT COUNT(id) as count_pending_order from statistics WHERE client_id = ${data.client_id} AND partner_id = ${data.partner_id} AND action = 'pending_order'),
              (SELECT COUNT(id) as count_complete_order from statistics WHERE client_id = ${data.client_id} AND partner_id = ${data.partner_id} AND action = 'complete_order'),
              (SELECT SUM( convertToBaseCurrency((orders.total_price_order_rate)::NUMERIC, ${data.client_id}, (orders.product->0->>'currency_id')::INTEGER) ) AS sum_pending_order FROM orders WHERE step = 'pending' AND partner_id = ${data.partner_id}),
              (SELECT SUM( convertToBaseCurrency((orders.total_price_order_rate)::NUMERIC, ${data.client_id}, (orders.product->0->>'currency_id')::INTEGER) ) AS sum_complete_order FROM orders WHERE step = 'complete' AND partner_id = ${data.partner_id}),
              (SELECT SUM(fee_added::NUMERIC) as sum_fee_added from fee WHERE partner_id = ${data.partner_id}),
              (SELECT SUM(fee_payed::NUMERIC) as sum_fee_payed from fee WHERE partner_id = ${data.partner_id})
              `))
                .then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                })
        })
    }

})

module.exports = Order;