var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var config = require('./config');


var app = express();
var http = require('http').Server(app);

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(favicon(__dirname + '/public/favicon.ico'));



app.use(require('./routes/api'));
app.get('*', function(req, res){
    res.render('client')
});

var server = http.listen(config.get('port'), function() {
    console.log("Listening %s on port: %s", server.address().address, server.address().port)
});