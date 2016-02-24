import alt from '../../../client/src/js/alt';
import ModalActions from './ModalActions';
var _ = require('lodash');


class ModalStore {

    constructor() {

        this.data = {};
        this.componentName = null;
        this.isHide = true;

        this.bindListeners({
            onSet: ModalActions.SET,
            onHide: ModalActions.HIDE
        });
    }

    onSet(obj) {
        this.data = obj.data;
        this.componentName = obj.name;
        this.isHide = false;
    }

    onHide() {
        this.componentName = null;
    }
}


export default alt.createStore(ModalStore, 'ModalStore');