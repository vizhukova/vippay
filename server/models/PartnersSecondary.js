var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');

/**
 * Модель партнёра
 */
var PartnerSecondary = bookshelf.Model.extend({},{


    get(partner_id){
        return knex('users')
            .leftJoin('referers', 'referers.user_id', '=', 'users.id')
            .where({'referers.referer_id': partner_id})
            .select('*')
            .orderBy('id', 'asc')
    }
});

module.exports = PartnerSecondary;
