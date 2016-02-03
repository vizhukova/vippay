'use strict';
var crypto = require('crypto');


class Robokassa{

    constructor(login, password, orderId){

        this.login = login;
        this.password = password;
        this.orderId = orderId;

    }

    static buildPaymentUrl(login, password1, orderId, orderDescription, orderSum){

        var signature = crypto.createHash('md5')
            .update(`${login}:${orderSum}:${orderId}:${password1}`)
            .digest("hex");

        return `https://auth.robokassa.ru/Merchant/Index.aspx?MrchLogin=${login}&OutSum=${orderSum}&InvId=${orderId}&Desc=${orderDescription}&SignatureValue=${signature}`;

    }

    static checkSignature(){

    }

}

module.exports = Robokassa;