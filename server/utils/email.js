var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sendmailTransport = require('nodemailer-sendmail-transport');

var transporter = nodemailer.createTransport(sendmailTransport({}));


module.exports = {
    send(to, subject, text){
        transporter.sendMail({
            from: 'test@vippay.info',
            to: to,
            subject: subject,
            text: text
        }, function(err, info){
            var a;
        });
    }
};