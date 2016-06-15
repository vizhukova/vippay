var checkit = require('checkit');
var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../db');
var knex = require('../knex_connection');

/**
 * Модель партнёра
 */
var Partner = bookshelf.Model.extend({

    tableName: 'users',

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
            password: [{
                rule: 'required',
                message: 'Поле "пароль" обязательно для заполнения'
            }]
        }).run(this.attributes);
    }

}, {


    login: Promise.method(function (partner) {

         var record = {
            email: partner.email,
            password: partner.password
        };

        if (!record.email || !record.password) throw new Error('Email и пароль обязательны');
        return new this({email: record.email.trim()}).fetch({require: true}).tap(function (customer) {
            //return bcrypt.compareAsync(customer.get('password'), password)
            //    .then(function (res) {
            //        if (!res) throw new Error('Неверный пароль');
            //    });
            if (customer.get('password') !== partner.password)
                throw new Error('Неверный пароль');
            if (!customer.get('active'))
                throw new Error('Партнер не активен');
            if (customer.get('type') !== 'partner')
                throw new Error('Вы нее зарегестрированы');

        });
    }),

    getByClientId: Promise.method(function (id) {
        return knex.select().from('clients-partners').where('client_id', id);
    }),

    register(partner){

        var inserted;

        var record = {
            name: partner.name,
            login: partner.login,
            email: partner.email,
            password: partner.password,
            type: 'partner',
            basic_currency: 1,
            payment: JSON.stringify(partner.payment)
        };

        return knex('users').insert(record).returning('*').then((u) => {

            inserted = u[0];

            if (partner.referer) {

                return knex('users').first('id').where({login: partner.referer, type: 'partner'}).then((p) => {

                    return knex('referers').insert({

                        user_id: u[0].id,
                        referer_id: p.id,
                        client_id: partner.client_id

                    })

                })

            } else {

                return Promise.resolve();

            }

        }).then(() => {

            return Promise.resolve(inserted)

        })

    },

    setReferrer(obj) {
        return new Promise ((resolve, reject) => {

        knex('referers')
            .first()
            .where(obj)
        .then((referer) => {

            if(! referer) {

                return knex('referers')
                    .insert(obj)

            } else {
                Promise.resolve();
            }

        }).then((data) => {

            resolve(data);

        }).catch((err) => {

            reject(err);

        })

        })
    },

    bindWithClient(data) {
        return new Promise((resolve, reject) => {
            knex('clients-partners')
                .insert({client_id: data.client_id, partner_id: data.partner_id})
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    guestLogin(login){
        return new this({login: login}).fetch({require: true}).tap(function (customer) {

        });
    },


    getAll: Promise.method(function (client_id) {
        return knex.select('users.*', 'clients-partners.fee as partner_fee', 'clients-partners.fee_secondary as partner_fee_secondary')
            .from('users')
            .join('clients-partners', 'partner_id', '=', 'users.id')
            .where('client_id', '=', client_id)
            .orderBy('id', 'asc')
    }),

    getById: Promise.method(function (id) {
        return knex.first().from('users').where({'id': id});
    }),

    edit(partner){
        return new Promise((resolve, reject) => {

            partner.payment = JSON.stringify(partner.payment);

            knex('users')
                .where({id: partner.id})
                .update(partner)
                .then((res) => {
                    resolve(partner);
                }).catch((err) => {
                reject(err);
            })
        })
    },

    get(id){
        return knex('users')
            .first('login', 'name', 'id')
            .where({id: id})
    },

    getReferer(id){

        return knex('referers')
            .first('*')
            .join('users', 'referer_id', '=', 'users.id')
            .where({user_id: id})

    }
});

module.exports = Partner;
