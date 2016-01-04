var alt = require('../alt');
var AppActions = require('../actions/AppActions');

class AuthStore {

    constructor() {
        this.auth = false;

        this.bindListeners({
            setAuth: AppActions.SET_AUTH
        });
    }

    setAuth(auth){
        this.auth = auth;
    }
}

export default alt.createStore(AuthStore, 'AuthStore');