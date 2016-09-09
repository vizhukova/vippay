var jade = require('jade');
var email = require('../utils/email');
var domain = require('../config').get('domain');

module.exports = {
    registration: registration,
    setNewPassword: setNewPassword,
    pendingOrder: pendingOrder,
    payedOrder: payedOrder,
    staffRegister: staffRegister,
}

function registration(userName, userEmail, userUrl) {

    var html = jade.compileFile('templates/letters/registation.jade')(
        {
            name: userName,
            domain: domain,
            clientUrl: userUrl
        }
    );

    var alternative = `Спасибо за регистрацию! Ссылка на ваш аккаунт: ${userUrl}`;

    email.send(userEmail, 'Успешная регистрация', html, [alternative]);
}

function setNewPassword(userName, userEmail, userPassword) {

     var html = jade.compileFile('templates/letters/newPassword.jade')(
        {
            password: userPassword,
            domain: domain
        }
    );

    var alternative = `Ваш новый пароль: ${userPassword}`;

    email.send(userEmail, 'Успешная установка нового пароля', html, [alternative]);
}

function pendingOrder(userEmail, orderId, linkToPay) {

     var html = jade.compileFile('templates/letters/payedOrder.jade')(
        {
            orderId: orderId,
            domain: domain,
            linkToPay: linkToPay
        }
    );

    var alternative = `Ваш заказ №${orderId} успешно оформлен. Ссылка на оплату: ${linkToPay}`;

    email.send(userEmail, 'Заказ оформлен', html, [alternative]);
}

function payedOrder(userEmail, orderId) {

     var html = jade.compileFile('templates/letters/pendingOrder.jade')(
        {
            email: userEmail,
            orderId: orderId,
            domain: domain
        }
    );

    var alternative = `Ваш заказ №${orderId} успешно оплачен.`;

    email.send(userEmail, 'Заказ оплачен', html, [alternative]);
}

function staffRegister(userLogin, userUrl, userPassword, userEmail) {

     var html = jade.compileFile('templates/letters/staffRegister.jade')(
        {
            userLogin: userLogin,
            userUrl: userUrl,
            userPassword: userPassword,
            domain: domain
        }
    );

    var alternative = `Ссылка для входа на сайт: ${userUrl}.
                                      Ваш логин: ${userLogin}.
                                     Ваш пароль: ${userPassword}.`;

    email.send(userEmail, 'Данные для входа', html, [alternative]);
}