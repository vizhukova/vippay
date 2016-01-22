import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from '../actions/ApiActions';

class AuthActions {

    setAuth(auth){
        this.dispatch(auth);
    }

    check() {
        var self = this;
        ApiActions.get('check', {role: 'partner'}).then(function(data){
            self.dispatch(true);
        }).catch(function(err){
            self.dispatch(false);
        })
    }

}

export default alt.createActions(AuthActions);