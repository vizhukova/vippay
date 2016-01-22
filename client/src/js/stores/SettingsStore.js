import alt from '../alt';
import SettingsAction from './../actions/SettingsAction';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.currencies = [];
        this.basicCurrency;
        this.rate={};
        this.bindListeners({
            onGetAll: SettingsAction.GET,
            onGetAllCurrencies: SettingsAction.GET_ALL_CURRENCIES,
            onSetBasicCurrency: SettingsAction.SET_BASIC_CURRENCY,
            onAddRate: SettingsAction.ADD_RATE
        });
    }

    onGetAll(state){
        this.link = state.link;
    }

    onGetAllCurrencies(currencies) {
        console.log('SettingsStore currencies', currencies);
        this.currencies = currencies;
        var current = _.findWhere(currencies, {basic: true});
        this.basicCurrency = current.id; //? current[0] : current;
    }

    onSetBasicCurrency(id) {
        this.basicCurrency = id;
    }

    onAddRate(rate) {
        this.rate = rate;
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');