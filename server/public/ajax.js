function getDomain() {
    return '/api/';
}

var ApiActions = {

    get: function (path, data) {

        var BASE_URL = getDomain();

        var jqxhr = $.ajax({

            method: 'GET',
            url: BASE_URL + path,
            data: data,
            contentType: "application/json; charset=utf-8"
            //success(res){
            //    dfd.resolve(res);
            //},
            //error(response){
            //    dfd.reject(response);
            //}
        });

        return jqxhr;
    },

    post: function (path, data) {

        var BASE_URL = getDomain();

        var jqxhr = $.ajax({

            method: 'POST',
            url: BASE_URL + path,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
            //success(response){
            //    debugger
            //    dfd.resolve(response);
            //},
            //error(response){
            //    debugger
            //    dfd.reject(response);
            //}

        });

        return jqxhr;
    },

    put: function (path, data) {

        var BASE_URL = getDomain();

        var jqxhr = $.ajax({

            method: 'PUT',
            url: BASE_URL + path,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
            //success(response){
            //    dfd.resolve(response);
            //},
            //error(response){
            //    dfd.reject(response);
            //}

        });

        return jqxhr;
    },

    remove: function (path, data) {

        var BASE_URL = getDomain();

        var jqxhr = $.ajax({

            method: 'DELETE',
            url: BASE_URL + path,
            data: data
            //success(response){
            //    dfd.resolve(response);
            //},
            //error(response){
            //    dfd.reject(response);
            //}

        });

        return jqxhr;
    }

};


//function getDomain(){
//    return '/api/';
//}
//
//var ApiActions = {
//
//     get: function(path, data) {
//
//        var BASE_URL = getDomain();
//
//        return new Promise(function (resolve, reject) {
//            $.ajax({
//
//                method: 'GET',
//                url: BASE_URL + path,
//                data: data,
//                contentType: "application/json; charset=utf-8",
//                success(res){
//                    resolve(res);
//                },
//                error(response){
//                    reject(response);
//                }
//            });
//        })
//    },
//
//     post: function(path, data) {
//
//        var BASE_URL = getDomain();
//
//        return new Promise(function (resolve, reject) {
//            $.ajax({
//
//                method: 'POST',
//                url: BASE_URL + path,
//                data: JSON.stringify(data),
//                contentType: "application/json; charset=utf-8",
//                success(response){
//                    resolve(response);
//                },
//                error(response){
//                    reject(response);
//                }
//
//            });
//        })
//    },
//
//    put: function(path, data) {
//
//        var BASE_URL = getDomain();
//
//        return new Promise(function (resolve, reject) {
//            $.ajax({
//
//                method: 'PUT',
//                url: BASE_URL + path,
//                data: JSON.stringify(data),
//                contentType: "application/json; charset=utf-8",
//                success(response){
//                    resolve(response);
//                },
//                error(response){
//                    reject(response);
//                }
//
//            });
//        })
//    },
//
//    remove: function(path, data) {
//
//        var BASE_URL = getDomain();
//
//        return new Promise(function (resolve, reject) {
//            $.ajax({
//
//                method: 'DELETE',
//                url: BASE_URL + path,
//                data: data,
//                success(response){
//                    resolve(response);
//                },
//                error(response){
//                    reject(response);
//                }
//
//            });
//        })
//    }
//
//}
//
