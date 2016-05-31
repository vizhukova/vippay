var PartnersSecondary = require('../models/PartnersSecondary');
var Promise = require('bluebird');
/**
 * Работа с партнёрами второго уровня
 */
module.exports = {

    get(partner_id) {
        return new Promise(function(resolve, reject){

            PartnersSecondary.get(partner_id).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })

        })
    }
};