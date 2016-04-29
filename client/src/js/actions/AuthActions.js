import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from '../actions/ApiActions';

class AuthActions {

    /**
     * проверка залогинен ли клиент
     */

    check(token) {

        return new Promise((resolve,reject) => {
            var self = this;
            ApiActions.get('check', {role: 'client'}).then(function(data){
                self.dispatch(true);
                resolve();

            }).catch(function(err){
                self.dispatch(false);
                reject(new Error(err.responseText));

            })
        })

    }


    /**
     * Получение данных о клиенте
     */
    getMe(){

        return new Promise((resolve,reject) => {
            var self = this;
            ApiActions.get('me').then(function(user){
                self.dispatch(user);
                resolve();
            }).catch(function(err){
                reject(err);
            })
        })
    }

}

export default alt.createActions(AuthActions);