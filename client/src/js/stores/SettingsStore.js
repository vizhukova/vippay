import alt from '../alt';
import SettingsAction from './../actions/SettingsAction';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.bindListeners({
            onGetAll: SettingsAction.GET
        });
    }

    onGetAll(state){
        this.link = state.link;
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');