import alt from '../alt';
import AuthActions from './../actions/AuthActions';

class AuthStore {

    constructor() {

        this.bindListeners({
            onCheck: AuthActions.CHECK,
            onGetMe: AuthActions.GET_ME
        });

        this.user = {

        };
    }

    onCheck(auth){
        this.auth = auth;
    }

    onGetMe(user){
        console.log('AuthStore user:', user);
        this.user = user;
    }
}

export default alt.createStore(AuthStore, 'AuthStore');