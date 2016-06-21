/**
 * Список подключенных платежных систем
 * @type {*[]}
 */
module.exports = [{
    name: 'interkassa',
    active: false,
    fields: {
        'id_kassa': '',
        'id_confirm': ''
    }
},{
    name: 'yandex',
    active: true,
    fields: {
        'receiver': ''
    }
},{
    name: 'liqpay',
    active: false,
    fields: {
        'private_key': '',
        'public_key': ''
    }
}, {
    name: 'paypal',
    active: false,
    fields: {
        'client_id': '',
        'client_secret': ''
    }
}
];

