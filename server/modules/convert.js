var bookshelf = require('../db');
var knex = require('../knex_connection')

/**
 * Конвертация валют
 * @param val
 * @param client_id
 * @param from_val
 * @param to_val
 * @returns {Promise}
 */
module.exports = function(val, client_id, from_val, to_val){

    return new Promise((resolve, reject) => {

        knex.raw(`SELECT convert(${val}, int4(${client_id}), int4(${from_val}), int4(${to_val}) )`).then((res) => {
            resolve(res.rows[0].convert);
        }).catch((err) => {
            reject(err);
        })

    })

};

