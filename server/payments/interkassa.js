'use strict';

var Promise = require('bluebird');
var UserController = require('../controllers/User');


class InterKassa{

    constructor(){

    }


    static getData(order_id, user_id){

        return new Promise(function(resolve, reject){

            UserController.getById(user_id).then(function(user){



            })

        })

    }

}