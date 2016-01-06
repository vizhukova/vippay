var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex');

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

    login: Promise.method(function (login, password) {
        if (!login || !password) throw new Error('Email и пароль обязательны');
        return new this({login: login.toLowerCase().trim()}).fetch({require: true}).tap(function (customer) {
            //return bcrypt.compareAsync(customer.get('password'), password)
            //    .then(function (res) {
            //        if (!res) throw new Error('Неверный пароль');
            //    });
            if(customer.get('password') !== password)  throw new Error('Неверный пароль');
        });
    }),

    register: Promise.method(function (user) {
        var record = new this({name: user.name, login: user.login, email: user.email, password: user.password});

        return record.save();
    })

});

module.exports = User;