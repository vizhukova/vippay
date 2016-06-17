var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('./../config');
var Promise = require('bluebird');
var _ = require('lodash');
var moment = require('moment');
var email = require('../utils/email');
var auth_domain = config.get('auth_domain');
var RateController = require('../controllers/Rate');
var FeeController = require('../controllers/Fee');
var UserController = require('../controllers/User');
var StaffController = require('../controllers/Staff');
var AclController = require('../controllers/Acl');


//var checkTrialTariff = require('./../middlewares/tariffs/checkTrialTariff');
//var checkBaseTariff = require('./../middlewares/tariffs/checkBaseTariff');
//var checkStartTariff = require('./../middlewares/tariffs/checkStartTariff');


//router.get('/settings', function(req, res){
//
//    var link = `http://${req.subdomain}.${req.postdomain}/partners`;
//    res.send({link: link,
//              auth_domain: auth_domain,
//              out_link: `http://${req.subdomain}.${req.postdomain}/api/out`,
//              isStaff: req.staffObj ? true : false,
//              special_access: req.clientObj.special_access });
//
//});
//
//router.get('/settings/partner', function(req, res){
//
//    res.send({domain: req.postdomain, out_link: `http://${req.subdomain}.${req.postdomain}/api/partner/out`});
//
//});

router.put('/rate', function(req, res, next) {

    RateController.edit({rate: req.body, client_id: req.clientObj.id})
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                next(err);
            });

});

router.get('/rate', function(req, res, next) {

    RateController.get(req.clientObj.id)
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                next(err);
            });

});

router.get('/bank_rate', function(req, res, next) {

    RateController.getBank()
            .then(function(rate){
                res.send(rate);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                 next(err);
            });

});

router.get('/fee', function(req, res, next) {

    FeeController.getFee(req.clientObj.id)
            .then(function(fee){
                res.send(fee);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                next(err);
            });

});

router.put('/fee', function(req, res, next) {

    FeeController.editFee({id: req.clientObj.id, fee: req.body.fee, fee_secondary: req.body.fee_secondary})
            .then(function(fee){
                res.send(fee);
            }).catch(function(err) {
                if( err.code == '22003'){
                    err.constraint = 'too_big_value';
                }
                next(err);
            });

});

router.get('/payments', function(req, res, next) {

    UserController.getPayment(req.clientObj.id)
            .then(function(data){
                res.send(data.payment);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                next(err);
            });

});

router.put('/payments',  function(req, res, next) {

    var interkassa = _.findWhere(req.body, {name: 'interkassa'});
    var fileName = `${__dirname}/../interkassa_files/${interkassa.fields.id_kassa}`;
    var fileVal = interkassa.fields.id_confirm;

    fs.access(fileName, fs.F_OK, (err) => {

        if(err) {

            console.log(`File ${fileName} does not exists`);

            fs.appendFile(fileName, fileVal, function (err) {
                  if (err) return console.log(err);
                  console.log(`Write  ${fileVal} > ${fileName}.txt`);
               });

        } else {

            fs.unlink(fileName, (err) => {

              if (err) {

                  console.log(`Error: can't delete file ${fileName}`);

              } else {

                console.log(`File ${fileName} successfully deleted`);

                  fs.appendFile(fileName, fileVal, function (err) {
                      if (err) return console.log(err);
                      console.log(`Write  ${fileVal} > ${fileName}.txt`);
                   });

              }

            });

        }

    });


    UserController.putPayment({payment: req.body, user_id: req.clientObj.id})
            .then(function(payment){
                res.send(payment);
            }).catch(function(err) {
                //res.status(400).send(err.errors);
                next(err);
            });

});

router.get('/settings/tariff', function(req, res, next) {
    var active = req.tariff.active;

    UserController.getTariff(req.clientObj.id).then((result) => {
        if(result.tariff_name === 'start') result.isActive = active;
        res.send(result)
    }).catch((err) => {
        //res.status(404).send(err.errors)
        next(err);
    })

});


router.put('/settings/tariff', function(req, res, next) {

    var newTariff = _.omit(req.body, ['_method']);

    newTariff.tariff_date = moment();
    newTariff.tariff_payed = false;
    newTariff.id = +newTariff.id || req.clientObj.id;
    //newTariff.active = false;

    UserController.setTariff(newTariff).then((result) => {
        res.send(result)
    }).catch((err) => {
        //res.status(404).send(err.error)
        next(err);
    })
});

router.put('/settings/tariff/pay', function(req, res, next) {

    var newUser = _.omit(req.body, ['_method']);

    newUser.id = newUser.id || req.clientObj.id;

    if(req.body.tariff_payed === undefined) {

        newUser.tariff_payed = true;
        newUser.tariff_date = moment();

    } else {

        newUser.tariff_payed = req.body.tariff_payed;
        newUser.tariff_date = req.body.tariff_payed ? moment() : null;
        if (! newUser.tariff_payed) newUser.tariff_name = null;

    }

    UserController.setTariff(newUser).then((result) => {
        //res.send(result)
        res.redirect('back');
    }).catch((err) => {
        //res.status(404).send(err.error)
        next(err);
    })
});

router.get('/staff', function(req, res, next) {
    StaffController.get({
        client_id: req.clientObj.id
    }).then((result) => {
        res.send(result)
    }).catch((err) => {
        //res.status(404).send(err.error)
        next(err);
    })
});

router.get('/staff/:id', function(req, res, next) {
    StaffController.get({
        id: req.params.id
    }).then((result) => {
        res.send(result[0])
    }).catch((err) => {
        //res.status(404).send(err.error)
        next(err);
    })
});

router.post('/staff', function(req, res, next) {
    req.body.staff.client_id = req.clientObj.id;
    var staff = {};
    StaffController.add(req.body.staff).then((s) => {
        staff = s.attributes;
        return Promise.map(req.body.routes, function (item, index) {
            _.assign(item, {staff_id: staff.id});

            return AclController.add(item);
        })
    }).then((routes) => {
        var domain = `http://${req.subdomain}.${req.postdomain}`;
        email.send(staff.email, 'Данные для входа', `Ссылка для входа на сайт: ${domain}.
                                                                Ваш логин: ${staff.login}.
                                                                Ваш пароль: ${staff.password}`);
        res.send(staff);
    }).catch((err) => {
        if(err.code == 23502) err.constraint = 'check_this_data';
        next(err);
        //res.status(404).send(err.error)
    })
});

router.put('/staff/active/:id', function(req, res, next) {
    StaffController.edit(req.body).then((result) => {
        res.send(result[0])
    }).catch((err) => {
        //res.status(404).send(err.error)
        next(err);
    })
});

router.put('/staff/:id', function(req, res, next) {

    var staff = {};
    StaffController.edit(req.body.staff).then((s) => {
        staff = s[0];

        return AclController.get({staff_id: +staff.id});

    }).then((routes) => {

        return Promise.map(req.body.routes, function (item, index) {
            _.assign(item, {staff_id: staff.id});

            if(routes.length > 0)return AclController.edit(item);
            else return AclController.add(item);
        })

    }).then((r) => {
         var domain = `http://${req.subdomain}.${req.postdomain}`;
         email.send(staff.email, 'Данные для входа', `Ссылка для входа на сайт: ${domain}.
                                                                Ваш логин: ${staff.login}.
                                                                Ваш пароль: ${staff.password}`);
        res.send(staff[0]);
    }).catch((err) => {
        if(err.code == 23502) err.constraint = 'check_this_data';
        next(err);
        //res.status(404).send(err.error)
    })
});

router.delete('/staff/:id', function(req, res, next) {

    StaffController.remove(req.params.id).then((result) => {
        res.send(result[0])
    }).catch((err) => {
       //res.status(400).send(err.error)
        next(err);
    })
});

router.get('/routes/:id', function(req, res, next) {
    AclController.get({
        staff_id: req.params.id
    }).then((routes) => {
        res.send(routes)
    }).catch((err) => {
        //res.status(404).send(err.error)
        next(err);
    })
});


module.exports = router;
