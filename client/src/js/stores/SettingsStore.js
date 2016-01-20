import alt from '../alt';
import SettingsAction from './../actions/SettingsAction';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.currencies = [];

        this.bindListeners({
            onGetAll: SettingsAction.GET,
            onGetAllCurrencies: SettingsAction.GET_ALL_CURRENCIES
        });
    }

    onGetAll(state){
        this.link = state.link;
    }

    onGetAllCurrencies(currencies) {
        console.log('SettingsStore currencies', currencies);
        this.currencies = currencies;
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');