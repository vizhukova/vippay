var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var config = require('./config');
var _ = require('lodash');
//var session = require('express-session');
//var flash = require('req-flash');
var User = require('./models/Users');

var app = express();
var http = require('http').Server(app);

var getSubdomain = require('./middlewares/getSubdomain');
var getClientObj = require('./middlewares/getClientObj');
var getUserId = require('./middlewares/getUserId');
var getPartnerObj = require('./middlewares/getPartnerObj');
var getStaffObj = require('./middlewares/getStaffObj');
var getInterkassaId = require('./middlewares/getInterkassaId');
var checkError = require('./middlewares/checkError');
var checkStaffAccess = require('./middlewares/checkStaffAccess');
var redirect = require('./middlewares/redirect');
var isAdmin = require('./middlewares/admin');
var crossDomainQueries = require('./middlewares/crossDomainQueries');
var pendingModule = require('./modules/pending');
var basketModule = require('./modules/basket');
var paymentModule = require('./modules/payment');
var getAdminData = require('./modules/admin');
var getTariffData = require('./modules/getTariffData');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'templates'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(methodOverride('_method'));

app.use(crossDomainQueries);
app.use(isAdmin);
app.use(getSubdomain);
app.use(getUserId);
app.use(getClientObj);
app.use(getPartnerObj);
app.use(getStaffObj);
app.use(getInterkassaId);
app.use(checkStaffAccess);
app.use(redirect);


/*var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash({ locals: 'flash' }));

passport.use('userLogin', new LocalStrategy(
  function(req, login, password, done) {

      User.login({
          email: req.body.email,
          password:  req.body.password
      }).then((user) => {
            console.log('111111111111111111111111111111111111')
            console.log(user)
          return done(null, user);

      })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});*/


var timestamp = Date.now();
var designClass = config.get('designClass');

app.get('/admin', getAdminData, function(req, res) {

    if(! req.admin) res.render('admin/login', {designClass: designClass, timestamp: timestamp});

    else {
        var data = _.assign(req.adminData, {designClass: designClass}, {timestamp: timestamp});
        res.render('admin/page', data);
    }

});

app.get('/checkout', getTariffData, function(req, res) {

    var data = _.assign(req.tariffData, {designClass: designClass}, {timestamp: timestamp});
    res.render('paymentTariff', data);

});

app.get('/', redirect, function(req, res){

    if(req.user.role && (req.user.role != 'staff' && req.user.role != 'client')) {
        res.redirect(`http://auth.${req.postdomain}`);
        return;
    }

    var payment = req.clientObj ? _.findWhere(req.clientObj.payment, {name: 'interkassa'}) : {};
    payment = payment || {};
    var id_confirm = payment.fields ? payment.fields.id_confirm : payment.fields;

   res.render('client', {timestamp: timestamp, designClass: designClass, id_confirm: id_confirm})


});

app.use(require('./routes/log'));
app.use(require('./routes/api'));

app.use(require('./routes/redirect'));

app.get('/basket/:id*',basketModule, function(req, res){ //show basket

    res.render('basket', {basketItems: req.basketItems, currency: req.currency, redirectBack: req.headers.referer, designClass: designClass, timestamp: timestamp});
});

app.get('/order/basket/:id*', basketModule, function(req, res){

    res.render('basketPending', {basketItems: req.basketItems, currency: req.currency, designClass: designClass, timestamp: timestamp});

});

app.get('/order/payment/:order_id*', paymentModule, function(req, res){ //pending order

    var data = _.assign(req.payment, {designClass: designClass}, {timestamp: timestamp});
    res.render('paymentOrder', data);

});

app.get('/order/:id*', pendingModule, function(req, res){ //pending order

    var data = _.assign(req.pending, {designClass: designClass}, {timestamp: timestamp});
    res.render('pending', data);

});

app.get('/:partner', function(req, res){

    if(req.user.role && req.user.role != 'partner') {
        res.redirect(`http://auth.${req.postdomain}`);
        return;
    }

    if( !req.clientObj.id && req.partnerObj ) {
        var result =  _.findIndex(req.clientsObj, (item) => {
            return item.login.toLowerCase() == req.subdomain;
        });

        if(result == -1) {
            res.redirect(`http://auth.${req.postdomain}`);
        }
    }

    res.render('partner', {designClass: designClass, timestamp: timestamp});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  if (req.xhr) {
    checkError(err, res);
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500);
  res.render('error', { error: err });
});

var server = http.listen(config.get('port'), function() {
    console.log("Listening %s on port: %s", server.address().address, server.address().port)
});
