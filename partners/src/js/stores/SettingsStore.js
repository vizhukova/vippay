import alt from '../alt';
import ProductsAction from './../actions/SettingsActions';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.clients = [];
        this.current_client = {};
        this.bindListeners({
            onGet: ProductsAction.GET,
            setCurrentClient: ProductsAction.SET_CURRENT_CLIENT
        });
    }

    onGet(clients){
        var id = localStorage.getItem('current_client') ? localStorage.getItem('current_client') : localStorage.getItem('current_client_id');
        var current_client = _.findWhere(clients, {id: +id});

        this.clients = clients;
        this.current_client = current_client ? current_client : {};
        console.log('current_client SettingsStore', this.current_client)
    }

    setCurrentClient(client) {
        this.current_client = client;
         localStorage.setItem('current_client', client.id);
         console.log('current_client SettingsStore', this.current_client)
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');