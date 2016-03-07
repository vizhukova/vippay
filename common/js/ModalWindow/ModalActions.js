import alt from '../../../client/src/js/alt';
import Promise from 'bluebird';
import _ from 'lodash';

class ModalActions {

    set(data) {
        $('#myModal').modal('show');
        this.dispatch(data);
    }

    hide() {
        this.dispatch();
    }

}

export default alt.createActions(ModalActions);