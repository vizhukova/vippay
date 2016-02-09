import alt from '../alt';
import SettingsAction from './../actions/SettingsAction';
var _ = require('lodash');

class SettingsStore {

    constructor() {
        this.currencies = [];
        this.basicCurrency;
        this.fee = '';
        this.rate={};
        this.payment = [];

        this.bindListeners({
            onGetAll: SettingsAction.GET,
            onGetAllCurrencies: SettingsAction.GET_ALL_CURRENCIES,
            onSetBasicCurrency: SettingsAction.SET_BASIC_CURRENCY,
            onGetBasicCurrency: SettingsAction.GET_BASIC_CURRENCY,
            onAddRate: SettingsAction.ADD_RATE,
            onGetRate: SettingsAction.GET_RATE,
            onGetFee: SettingsAction.GET_FEE,
            onEditFee: SettingsAction.EDIT_FEE,
            onGetPayment: SettingsAction.GET_PAYMENT,
            onEditPayment: SettingsAction.EDIT_PAYMENT
        });
    }

    onGetAll(state){
        console.log('SettingsStore settings', state);
        this.link = state.link;
        this.auth_domain = state.auth_domain;
    }

    onGetAllCurrencies(currencies) {
        console.log('SettingsStore currencies', currencies);
        this.currencies = currencies;
    }


    onSetBasicCurrency(currency) {
        this.basicCurrency = currency.id;
        console.log('SettingsStore basicCurrency', currency.id);
    }

    onGetBasicCurrency(currency) {
        this.basicCurrency = currency.id;
        console.log('SettingsStore basicCurrency', currency.id);
    }

    onAddRate(rate) {
        this.rate = rate;
    }

    onGetRate(rate) {
        this.rate = rate;
        console.log('SettingsStore rate = ', rate);
    }

    onGetFee(fee) {
        this.fee = fee.partner_first_level;
        console.log('SettingsStore fee = ', fee);
    }

    onEditFee(fee) {
        this.fee = fee.partner_first_level;
        console.log('SettingsStore fee = ', fee);
    }

    onGetPayment(payment) {
        this.payment = payment;
         console.log('SettingsStore payment = ', payment);
    }

    onEditPayment(payment) {
        this.payment = payment;
         console.log('SettingsStore payment = ', payment);
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');