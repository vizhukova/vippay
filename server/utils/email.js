var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({

}, {
    // default values for sendMail method
    //from: 'sender@address',
    headers: {
        'My-Awesome-Header': '123'
    }
});


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