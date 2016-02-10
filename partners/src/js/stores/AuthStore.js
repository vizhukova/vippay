import alt from '../alt';
import AuthActions from './../actions/AuthActions';

class AuthStore {

    constructor() {

        this.bindListeners({
            onCheck: AuthActions.CHECK
        });
    }

    onCheck(auth){
        this.auth = auth;
        if(auth && location.hash.slice(2) === 'auth') location.hash = '';
    }
}

export default alt.createStore(AuthStore, 'AuthStore');