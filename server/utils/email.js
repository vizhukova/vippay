var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25
}));


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