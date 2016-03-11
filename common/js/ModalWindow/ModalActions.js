import alt from '../../../client/src/js/alt';
import Promise from 'bluebird';
import _ from 'lodash';

class ModalActions {

    set(data) {
        var m = $('#myModal');
        if (!m.is(':visible')) m.modal();
        this.dispatch(data);
    }

    hide() {
        debugger;

        this.dispatch();
    }

}

export default alt.createActions(ModalActions);