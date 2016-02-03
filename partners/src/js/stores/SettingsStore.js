import alt from '../alt';
import SettingsActions from './../actions/SettingsActions';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.clients = [];
        this.current_client = {};
        this.partner = {};
        this.bindListeners({
            onGet: SettingsActions.GET,
            setCurrentClient: SettingsActions.SET_CURRENT_CLIENT,
            getCurrentPartner: SettingsActions.GET_CURRENT_PARTNER
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

    getCurrentPartner(partner) {
        this.partner = partner;
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');