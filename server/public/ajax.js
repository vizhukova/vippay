function getDomain(){
    return '/api/';
}

var ApiActions = {

     get: function(path, data) {

        var BASE_URL = getDomain();

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'GET',
                url: BASE_URL + path,
                data: data,
                contentType: "application/json; charset=utf-8",
                success(res){
                    resolve(res);
                },
                error(response){
                    reject(response);
                }
            });
        })
    },

     post: function(path, data) {

        var BASE_URL = getDomain();

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'POST',
                url: BASE_URL + path,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success(response){
                    resolve(response);
                },
                error(response){
                    reject(response);
                }

            });
        })
    },

    put: function(path, data) {

        var BASE_URL = getDomain();

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'PUT',
                url: BASE_URL + path,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success(response){
                    resolve(response);
                },
                error(response){
                    reject(response);
                }

            });
        })
    },

    remove: function(path, data) {

        var BASE_URL = getDomain();

        return new Promise(function (resolve, reject) {
            $.ajax({

                method: 'DELETE',
                url: BASE_URL + path,
                data: data,
                success(response){
                    resolve(response);
                },
                error(response){
                    reject(response);
                }

            });
        })
    }

}

