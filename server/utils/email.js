var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sendmailTransport = require('nodemailer-sendmail-transport');
var config = require('../config');

var transporter = nodemailer.createTransport(sendmailTransport({}));
/**
 * Утилита для отправки писем на почту
 * @type {{send: (function(*=, *=, *=))}}
 */

var email = config.get('email');

module.exports = {

    send(to, subject, html, alternatives){

        var index = to.indexOf('@gmail');

        if(index !== -1) {

            transporter.sendMail({
                from: email,
                to: to,
                subject: subject,
                text: alternatives,
                alternatives: alternatives
            }, function(err, info){
                console.log(err);
                console.log(info);
            });

        } else {

             transporter.sendMail({
                from: email,
                to: to,
                subject: subject,
                html: html,
                alternatives: alternatives
            }, function(err, info){
                console.log(err);
                console.log(info);
            });

        }

    }

};