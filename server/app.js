var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var morgan = require('morgan')
var config = require('./config');
var _ = require('lodash');


var app = express();
var http = require('http').Server(app);

var getSubdomain = require('./middlewares/getSubdomain');
var getClientObj = require('./middlewares/getClientObj');
var getUserId = require('./middlewares/getUserId');
var getClientId = require('./middlewares/getClientId');
var getInterkassaId = require('./middlewares/getInterkassaId');
var getClientPartnerObj = require('./middlewares/getClientPartnerObj');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser())
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(getSubdomain);
app.use(getClientObj);
app.use(getUserId);
app.use(getClientId);
app.use(getInterkassaId);

var timestamp = Date.now();


app.get('/', getClientPartnerObj, function(req, res){



    if(req.subdomain == 'auth' && req.userObj) {
        var link ='';
        if(req.userObj.type == 'client') {
            link = `http://${req.userObj.login}.${req.postdomain}`;
        }
        else if(req.userObj.type == 'partner') {
            link = `http://${req.clientsObj[0].login}.${req.postdomain}/${req.userObj.login}`;
        }

        res.redirect(link);
    }

    else if(req.subdomain != 'auth') {
        var result = _.findIndex(req.clientsObj, (item) => {
            return item.login.toLowerCase() == req.subdomain;
        });

        if(result == -1) {
            res.redirect(`http://auth.${req.postdomain}`);
        }
    }

    var payment = req.clientObj ? _.findWhere(req.clientObj.payment, {name: 'interkassa'}) : {};
    var id_confirm = payment.fields ? payment.fields.id_confirm : payment.fields;
   res.render('client', {timestamp: timestamp, id_confirm: id_confirm})
});
app.use(require('./routes/api'));
app.use(require('./routes/redirect'));

app.get('/order/:id*', function(req, res){
    res.render('order', {timestamp: timestamp})
});
app.get('/:partner', getClientPartnerObj, function(req, res){

    if( !(req.clientObj && !req.userObj) ) {
        var result =  _.findIndex(req.clientsObj, (item) => {
            return item.login.toLowerCase() == req.subdomain;
        });

        if(result == -1) {
            res.redirect(`http://auth.${req.postdomain}`);
        }
    }

    res.render('partner', {timestamp: timestamp});
});
var server = http.listen(config.get('port'), function() {
    console.log("Listening %s on port: %s", server.address().address, server.address().port)
});