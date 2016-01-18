import alt from '../alt';
import SettingsAction from './../actions/StatisticAction';
var _ = require('lodash');

class StatisticStore {

    constructor() {
        this.statistic = [];

        this.bindListeners({
            onGet: SettingsAction.GET
        });
    }

    onGet(state){
        this.statistic = state;
    }

}

export default alt.createStore(StatisticStore, 'StatisticStore');