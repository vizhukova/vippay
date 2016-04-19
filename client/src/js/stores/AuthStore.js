import alt from '../alt';
import AuthActions from './../actions/AuthActions';
import PartnersAction from './../actions/PartnersAction';

class AuthStore {

    constructor() {

        this.bindListeners({
            onCheck: AuthActions.CHECK,
            onGetMe: AuthActions.GET_ME,
            onSetAuth: AuthActions.SET_AUTH
        });

        this.user = {

        };
    }

    onCheck(auth){
        this.auth = auth;
    }

    onGetMe(user){
        //console.log('AuthStore user:', user);
        this.user = user;
    }


    onSetAuth(data) {
        this.auth = data;
    }

}

export default alt.createStore(AuthStore, 'AuthStore');