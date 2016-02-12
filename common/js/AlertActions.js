import alt from '../../client/src/js/alt';
import Promise from 'bluebird';

class AlertActions {

    set(data) {
        this.dispatch(data);
    }

    hide() {
        this.dispatch({});
    }

}

export default alt.createActions(AlertActions);