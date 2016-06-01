import alt from '../alt';
import AuthActions from './../actions/AuthActions';
import PartnersAction from './../actions/PartnersAction';

class AuthStore {

    constructor() {

        this.bindListeners({
            onCheck: AuthActions.CHECK,
            onGetMe: AuthActions.GET_ME,
            out: AuthActions.OUT
        });

        this.user = {};
    }

    onCheck(auth){
        this.auth = auth;
    }

    onGetMe(user){
        this.user = user;
    }

    out(data) {
        this.isOut = true;
    }

}

export default alt.createStore(AuthStore, 'AuthStore');