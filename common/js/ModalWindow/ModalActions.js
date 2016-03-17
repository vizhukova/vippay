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
        var m = $('#myModal');
        if (m.is(':visible')) m.modal('hide');
        this.dispatch();
    }

}

export default alt.createActions(ModalActions);