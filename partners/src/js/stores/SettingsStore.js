import alt from '../alt';
import SettingsActions from './../actions/SettingsActions';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.clients = [];
        this.current_client = {};
        this.partner = {};
        this.statistic = {};

        this.bindListeners({
            onGet: SettingsActions.GET,
            onGetClients: SettingsActions.GET_CLIENTS,
            getCurrentPartner: SettingsActions.GET_CURRENT_PARTNER,
            getCurrentClient: SettingsActions.GET_CURRENT_CLIENT,
            getStatistic: SettingsActions.GET_STATISTIC
        });
    }

    onGetClients(clients){
        this.clients = clients;
    }

    onGet(settings) {
        this.domain = settings.domain;
        this.auth_domain = settings.auth_domain;
        this.out_link = settings.out_link;
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

    getStatistic(statistic) {
        this.statistic = statistic;
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');