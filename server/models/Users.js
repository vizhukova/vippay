var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

var User = bookshelf.Model.extend({

    tableName: 'users',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            //email: ['email', function(val) {
            //    return knex('users').where('email', '=', val).then(function(resp) {
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
                return knex('users').where('login', '=', val).then(function(resp) {
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


    login: Promise.method(function (user) {
        if (!user.email || !user.password) throw new Error('Email и пароль обязательны');
        return new this({email: user.email.toLowerCase().trim()}).fetch({require: true}).tap(function (customer) {
            //return bcrypt.compareAsync(customer.get('password'), password)
            //    .then(function (res) {
            //        if (!res) throw new Error('Неверный пароль');
            //    });
            if(customer.get('password') !== user.password)  throw new Error('Неверный пароль');
        });
    }),

    register: Promise.method(function (user) {
        var record = new this({name: user.name, login: user.login, email: user.email, password: user.password, basic_currency: user.basic_currency});

        return record.save();
    }),

    get: Promise.method(function (partner_id) {

        return knex.select('users.name', 'users.id')
            .from('partners')
            .innerJoin('clients-partners', 'clients-partners.partner_id', '=',  'partners.id')
            .innerJoin('users', 'clients-partners.client_id', '=',  'users.id')
            .where('partners.id', '=', partner_id)

    }),

    getById: Promise.method(function (id) {

        return knex
            .first()
            .from('users')
            .where('id', '=', id)

    }),

    getBasicCurrency: Promise.method(function (client_id) {

        return knex
            .first('basic_currency')
            .from('users')
            .where('id', '=', client_id)

    }),

    editBasicCurrency: Promise.method(function (data) {

        return knex('users')
            .update({basic_currency: +data.basic_currency})
            .where('id', '=', data.client_id)
            .returning('basic_currency')

    })


});

module.exports = User;

