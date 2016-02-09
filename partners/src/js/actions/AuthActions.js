import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from '../actions/ApiActions';

class AuthActions {

    setAuth(auth){
        this.dispatch(auth);
    }

    check() {
        var self = this;
        return new Promise ((resolve, reject) => {
            ApiActions.get('check', {role: 'partner'}).then(function(data){
                self.dispatch(true);
                resolve(data);
            }).catch(function(err){
                debugger
                self.dispatch(false);
                reject(err);
            })
        })
    }

}

export default alt.createActions(AuthActions);