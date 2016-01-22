var checkit = require('checkit');
var Promise = require('bluebird');
var bookshelf = require('../db');
var knex = require('../knex_connection');
var _ = require('lodash');

var Rate = bookshelf.Model.extend({

    tableName: 'rate',

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

    editRate(rate){
        var result = [];
        return new Promise((resolve, reject) => {
            _.forIn(rate, (value, key) => {
                var arr = key.split('-');//arr[0] - from    arr[1]  - to

                knex('rate')
                .update({from: +arr[0], to: +arr[1], result: +value})
                .where('from', '=', +arr[0])
                .andWhere('to', '=', +arr[1])
                .returning('from', 'to', 'result')
                .then((res) => {
                    result.push(res);
                    //if(result.length === _.keys(rate).length) resolve(result)
                })
                .catch((err) => {
                    result.push(err);
                })
            })

        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    }
})

module.exports = Rate;