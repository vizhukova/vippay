import alt from '../alt';
import AuthActions from './../actions/AuthActions';
import PartnersAction from './../actions/PartnersAction';

class AuthStore {

    constructor() {

        this.bindListeners({
            onCheck: AuthActions.CHECK,
            onGetMe: AuthActions.GET_ME,
            onEditFeeQuery: PartnersAction.EDIT_FEE_QUERY
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

    onEditFeeQuery(user) {
        this.user=user;
    }


}

export default alt.createStore(AuthStore, 'AuthStore');