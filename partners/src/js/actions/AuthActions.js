import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from '../actions/ApiActions';

class AuthActions {

    setAuth(auth){
        this.dispatch(auth);
    }


    /**
     * Проверка залогинен ли партнер
     */
    check() {
        var self = this;
        return new Promise ((resolve, reject) => {
            ApiActions.get('check', {role: 'partner'}).then(function(data){
                self.dispatch(true);
                resolve(data);
            }).catch(function(err){
                self.dispatch(false);
                reject(new Error(err.responseText));
            })
        })
    }

    out() {
        var self = this;
        return new Promise ((resolve, reject) => {
            ApiActions.get('partner/out').then(function(data){
                self.dispatch(true);
                resolve(data);
            }).catch(function(err){
                self.dispatch(false);
                reject(new Error(err.responseText));
            })
        })
    }


}

export default alt.createActions(AuthActions);