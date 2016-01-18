import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from '../actions/ApiActions';

class AuthActions {

    setAuth(auth){
        this.dispatch(auth);
    }

    check(token) {
        var self = this;
        ApiActions.get('check', {role: 'client'}).then(function(data){
            self.dispatch(true);
        }).catch(function(err){
            self.dispatch(false);
        })
    }

    guestLogin(login){

        return new Promise((resolve, reject) => {

            ApiActions.post('guest_login', {login: login}).then((data) => {
                localStorage.setItem('token', data.token);
                resolve(data.token);
            }).catch((err) => {
                reject(err);
            })

        })

    }

}

export default alt.createActions(AuthActions);