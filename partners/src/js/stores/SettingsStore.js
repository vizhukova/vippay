import alt from '../alt';
import ProductsAction from './../actions/SettingsActions';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.clients = [];
        this.bindListeners({
            onGet: ProductsAction.GET
        });
    }

    onGet(clients){
        this.clients = clients;
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');