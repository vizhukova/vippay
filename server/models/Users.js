var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');

var User = bookshelf.Model.extend({

    tableName: 'users',

    hasTimestamps: true,

    initialize: function () {
        this.on('saving', this.validateSave);
        this.on('updating', this.validateSave);
    },

    validateSave: function () {
        return checkit({
            email: {
                rule: 'email',
                message: 'Введите верный email'
            }
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
        var record = new this({login: user.login.toLowerCase().trim(), email: user.email, password: user.password});
        return record.save();
    })

});

module.exports = User;