import React from 'react';
import $ from 'jquery';
import Promise from 'bluebird';

function getDomain(){
    return '/api/';
}

class ApiActions{

    static get(path, data) {

        var BASE_URL = getDomain();

        var token = localStorage.getItem('token') || '';

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'GET',
                url: BASE_URL + path,
                data: data,
                success(res){
                    resolve(res);
                },
                error(response){
                    var error = new Error(response.responseJSON.msg);
                    reject(error);
                }
            });
        })
    }

    static post(path, data) {

        var BASE_URL = getDomain();
        var token = localStorage.getItem('token') || '';

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
                    auth: token,
                },
                error(response){
                    var error = new Error(response.text);
                    reject(error);
                }

            });
        })
    }

    static put(path, data) {

        var BASE_URL = getDomain();
        var token = localStorage.getItem('token') || '';

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'PUT',
                url: BASE_URL + path,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                headers: {
                    auth: token,
                },
                success(response){
                    resolve(response);
                },
                error(response){
                    reject()
                }

            });
        })
    }

    static remove(path, data) {

        var BASE_URL = getDomain();
        var token = localStorage.getItem('token') || '';

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'DELETE',
                url: BASE_URL + path,
                data: data,
                headers: {
                    auth: token,
                },
                success(response){
                    resolve(response);
                },
                error(response){
                    var error = new Error(response.text);
                    reject(error)
                }

            });
        })
    }


}

module.exports = ApiActions;