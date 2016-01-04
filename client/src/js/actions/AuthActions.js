var alt = require('../alt');
import Promise from 'bluebird';

class AuthActions {

    setAuth(){
        this.dispatch(auth);
    }

}

export default alt.createActions(AuthActions);