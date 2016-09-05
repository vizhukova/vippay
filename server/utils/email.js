var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sendmailTransport = require('nodemailer-sendmail-transport');
var config = require('../config');

var transporter = nodemailer.createTransport(sendmailTransport({}));
/**
 * Утилита для отправки писем на почту
 * @type {{send: (function(*=, *=, *=))}}
 */

let email = config.get('email');

module.exports = {
    send(to, subject, text){
        transporter.sendMail({
            from: email,
            to: to,
            subject: subject,
            text: text
        }, function(err, info){
            console.log(err);
            console.log(info);
        });
    }
};