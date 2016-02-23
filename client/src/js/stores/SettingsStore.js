import alt from '../alt';
import SettingsAction from './../actions/SettingsAction';
var _ = require('lodash');
var moment = require('moment');

class SettingsStore {

    constructor() {
        this.currencies = [];
        this.basicCurrency;
        this.fee = '';
        this.rate={};
        this.payment = [];
        this.tariff = {};
        this.isActiveTariff = true;

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
            onEditPayment: SettingsAction.EDIT_PAYMENT,
            onGetTariff: SettingsAction.GET_TARIFF,
            onSetTariff: SettingsAction.SET_TARIFF,
            onSetIsActive: SettingsAction.SET_IS_ACTIVE
        });
    }

    onGetAll(state){
        console.log('SettingsStore settings', state);
        this.link = state.link;
        this.auth_domain = state.auth_domain;
        this.out_link = state.out_link;
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
        this.rate = _.flatten(rate);
    }

    onGetRate(rate) {
        this.rate = rate.sort((a, b) =>  a.from == b.from ? a.to - b.to : a.from - b.from );
        console.log('SettingsStore rate = ', rate);
    }

    onGetFee(obj) {
        this.fee = obj.fee;
        console.log('SettingsStore fee = ', obj.fee);
    }

    onEditFee(obj) {
        this.fee = obj.fee;
        console.log('SettingsStore fee = ', obj.fee);
    }

    onGetPayment(payment) {
        this.payment = payment;
         console.log('SettingsStore payment = ', payment);
    }

    onEditPayment(payment) {
        this.payment = payment;
         console.log('SettingsStore payment = ', payment);
    }

    onGetTariff(tariff) {
        this.tariff = tariff;
        console.log('SettingStore tariff', tariff)

        if(tariff.tariff_name === 'start') { this.isActiveTariff = tariff.isActive; return; }

        var today = moment();
        var end_tariff;

        if(tariff.tariff_date) end_tariff = moment(tariff.tariff_date).add(tariff.tariff_duration, 'months');
        else end_tariff = moment(tariff.created_at).add(3, 'days');

        this.isActiveTariff = moment.min(today, end_tariff) == today;
        console.log('SettingStore isActiveTariff', this.isActiveTariff)
    }

    onSetTariff(tariff) {
        this.tariff = tariff;
        console.log('SettingStore tariff', tariff)
    }

    onSetIsActive(data) {
        this.isActiveTariff = data;
    }


}

export default alt.createStore(SettingsStore, 'SettingsStore');