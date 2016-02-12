import alt from '../../client/src/js/alt';
import AlertActions from './AlertActions';
var _ = require('lodash');


class AlertStore {

    constructor() {
        this.message={};
        this.show=false;
        this.types = ['error', 'success', 'info', 'warning'];

        this.bindListeners({
            onSet: AlertActions.SET,
            onHide: AlertActions.HIDE
        });
    }

    onSet(message) {
        var result = this.types.filter((item) => { return item === message.type; })
        if( result.length == 0 ) message.type = 'info';
        this.message = message;
        this.show = true;
    }

    onHide() {
        this.show = false;
    }


}

export default alt.createStore(AlertStore, 'AlertStore');