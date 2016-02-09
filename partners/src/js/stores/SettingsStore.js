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
            onGetClients: SettingsActions.GET_CLIENTS,
            getCurrentPartner: SettingsActions.GET_CURRENT_PARTNER,
            getCurrentClient: SettingsActions.GET_CURRENT_CLIENT
        });
    }

    onGetClients(clients){
        this.clients = clients;
    }

    onGet(settings) {
        this.domain = `${settings.domain}/${this.partner.login}`;
        this.auth_domain = settings.auth_domain;
        console.log('clients SettingsStore', this.clients)
        console.log('domain SettingsStore', this.auth_domain)
    }

    getCurrentPartner(partner) {
        this.partner = partner;
        console.log('partner SettingsStore', this.partner)
    }

    getCurrentClient(client) {
        this.current_client = client;
        console.log('current_client SettingsStore', this.current_client)
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');