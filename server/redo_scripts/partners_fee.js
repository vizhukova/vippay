var knex = require('../knex_connection');
var Promise = require("bluebird");
var _ = require('lodash');

var client_partner;
var fee;
var promiseArray = [];

knex('clients-partners')
.select('*')
.then((c) => {
    client_partner = c;

    return knex('fee')
           .select('*')

}).then((f) => {
    fee = f;


    client_partner.map((c_l) => {
        var index = _.findIndex(fee, {client_id: c_l.client_id, partner_id: c_l.partner_id});
        if(index < 0) {
            promiseArray.push(knex('fee')
                    .insert({
                        client_id: c_l.client_id,
                        partner_id: c_l.partner_id,
                        fee_payed: 0,
                        fee_added: 0
                    })
            )
        }

    })

    Promise.all(promiseArray).then((results) => {
        process.exit(0);
    }).catch((err) => {
        process.exit(1);
    })

})