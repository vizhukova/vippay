var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
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
        return checkit({}).run(this.attributes);
    }

}, {
    setDefault: Promise.method((client_id) => {
        return knex('rate').insert([{"from": '1', "to": '2', "result": '10', "client_id": client_id},
                {"from": '1', "to": '3', "result": '20', "client_id": client_id},
                {"from": '1', "to": '4', "result": '25', "client_id": client_id},
                {"from": '2', "to": '1', "result": '21', "client_id": client_id},
                {"from": '2', "to": '3', "result": '30', "client_id": client_id},
                {"from": '2', "to": '4', "result": '43', "client_id": client_id},
                {"from": '3', "to": '1', "result": '22', "client_id": client_id},
                {"from": '3', "to": '2', "result": '21', "client_id": client_id},
                {"from": '3', "to": '4', "result": '23', "client_id": client_id},
                {"from": '4', "to": '1', "result": '3', "client_id": client_id},
                {"from": '4', "to": '2', "result": '8', "client_id": client_id},
                {"from": '4', "to": '3', "result": '5', "client_id": client_id}])
            .returning('*')
    }),

    get: Promise.method((client_id) => {
        return knex('rate').select('*').where('client_id', '=', client_id);
    }),

    edit(data){
        return new Promise((resolve, reject) => {

            Promise.map(data.rate, (item) => {

                return knex('rate')
                    .update({from: +item.from, to: +item.to, result: +item.result})
                    .where('from', '=', +item.from)
                    .andWhere('to', '=', +item.to)
                    .andWhere('client_id', '=', +data.client_id)
                    .returning('*')

            }).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    },

    getResult: Promise.method((data) => {
            return knex('rate')
            .first('result')
            .where('client_id', '=', data.client_id)
            .andWhere('from', '=', data.from)
            .andWhere('to', '=', data.to)
    })
});

module.exports = Rate;