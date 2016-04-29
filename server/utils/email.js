var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sendmailTransport = require('nodemailer-sendmail-transport');

var transporter = nodemailer.createTransport(sendmailTransport({}));
/**
 * Утилита для отправки писем на поту
 * @type {{send: (function(*=, *=, *=))}}
 */

module.exports = {
    send(to, subject, text){
        transporter.sendMail({
            from: 'no-reply@vippay.info',
            to: to,
            subject: subject,
            text: text
        }, function(err, info){
            console.log(err);
            console.log(info);
        });
    }
};