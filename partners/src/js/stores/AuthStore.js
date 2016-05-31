import alt from '../alt';
import AuthActions from './../actions/AuthActions';

class AuthStore {

    constructor() {

        this.bindListeners({
            onCheck: AuthActions.CHECK,
            out: AuthActions.OUT
        });
    }

    onCheck(auth){
        this.auth = auth;
        if(auth && location.hash.slice(2) === 'auth') location.hash = '';
    }

    out(auth){
        this.isOut =true;
    }
}

export default alt.createStore(AuthStore, 'AuthStore');