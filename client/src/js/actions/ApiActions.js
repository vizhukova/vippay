import React from 'react';
import $ from 'jquery';
import Promise from 'bluebird';
import cookie from'./../../../../common/Cookies';
import checkError from './../../../checkError';
import SettingsActions from './SettingsAction';

function getDomain(){
    return '/api/';
}

class ApiActions{

    static get(path, data) {

        var BASE_URL = getDomain();
        var token = cookie.getCookie('token') || '';
        //console.log(window.location);
        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'GET',
                url: BASE_URL + path,
                data: data,
                contentType: "application/json; charset=utf-8",
                success(res){
                    resolve(res);
                },
                 headers: {
                    auth: token
                },
                error(response){
                    checkError.check(response);
                    reject(new Error());
                }
            });
        })
    }

    static post(path, data) {

        var BASE_URL = getDomain();
        var token = cookie.getCookie('token') || '';

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'POST',
                url: BASE_URL + path,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success(response){
                    resolve(response);
                },
                headers: {
                    auth: token
                },
                error(response){
                    checkError.check(response);
                    SettingsActions.getMessages(); // get error-messages from server
                    reject(new Error());
                }

            });
        })
    }

    static put(path, data) {

        var BASE_URL = getDomain();
        var token = cookie.getCookie('token') || '';

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'PUT',
                url: BASE_URL + path,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                headers: {
                    auth: token
                },
                success(response){
                    resolve(response);
                },
                error(response){
                    checkError.check(response);
                    SettingsActions.getMessages();// get error-messages from server
                    reject(new Error())
                }

            });
        })
    }

    static remove(path, data) {

        var BASE_URL = getDomain();
        var token = cookie.getCookie('token') || '';

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'DELETE',
                url: BASE_URL + path,
                data: data,
                headers: {
                    auth: token
                },
                success(response){
                    resolve(response);
                },
                error(response){
                    checkError.check(response);
                    SettingsActions.getMessages();// get error-messages from server
                    reject(new Error())
                }

            });
        })
    }


}

export default ApiActions;