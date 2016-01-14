var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

var Partner = bookshelf.Model.extend({

    tableName: 'partners',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            //email: ['email', function(val) {
            //    return knex('partners').where('email', '=', val).then(function(resp) {
            //        if (resp.length > 0) throw new Error('Такой электронный адрес уже существует')
            //    })
            //}, {
            //    rule: 'email',
            //    message: 'Введите верный email'
            //}],
            name: [{
                rule: 'required',
                message: 'Поле "ФИО" обязательно для заполнения'
            }],
            login: [/*'login', function(val) {
                return knex('partners').where('login', '=', val).then(function(resp) {
                    if (resp.length > 0) throw new Error('Такой логин уже существует')
                })
            },*/ {
                rule: 'required',
                message: 'Поле "логин" обязательно для заполнения'
            }],
            password:[{
                rule: 'required',
                message: 'Поле "пароль" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {


    login: Promise.method(function (partner) {
        if (!partner.email || !partner.password) throw new Error('Email и пароль обязательны');
        return new this({email: partner.email.trim()}).fetch({require: true}).tap(function (customer) {
            //return bcrypt.compareAsync(customer.get('password'), password)
            //    .then(function (res) {
            //        if (!res) throw new Error('Неверный пароль');
            //    });
            if(customer.get('password') !== partner.password)
                throw new Error('Неверный пароль');
        });
    }),

    register: Promise.method(function (partner) {
        var record = new this({client_id: partner.client_id, name: partner.name, login: partner.login, email: partner.email, password: partner.password});

        return record.save();
    }),


    getClientId: Promise.method(function (id) {
        return knex.first('client_id').from('partners').where('id', id);
    }),

    getAll: Promise.method(function (id) {
        return knex.select().from('partners').where('client_id', id);
    })
});

module.exports = Partner;
