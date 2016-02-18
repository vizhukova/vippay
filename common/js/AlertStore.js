import alt from '../../client/src/js/alt';
import AlertActions from './AlertActions';
import SettingsAction from './../../client/src/js/actions/SettingsAction';
var _ = require('lodash');


class AlertStore {

    constructor() {
        this.messages = [];
        this.types = ['error', 'success', 'info', 'warning'];

        this.bindListeners({
            onSet: AlertActions.SET,
            onHide: AlertActions.HIDE,
            onGetMessages: SettingsAction.GET_MESSAGES,
            onSetMessage: SettingsAction.SET_MESSAGE,
            onLeave: AlertActions.ON_LEAVE
        });
    }

    onSet(message) {
        var filter = _.filter(this.messages, (item) => message.text == item.text);
        if(filter.length > 0) return;//if there is such messages in the list

        if(message.type == 'success') {
            var new_m = _.filter(this.messages, (item) =>  !(item.type == 'error' || item.type == 'warning'));
            this.messages = new_m;
        }

        var result = this.types.filter((item) => { return item === message.type; })
        if( result.length == 0 ) message.type = 'info';

        this.messages.push(message);
    }

    onHide(data) {
        if(! data.id) this.onLeave();
        else this.messages = _.filter(this.messages, (item, index) => index != data.id );
    }

    onGetMessages(messages) {
        var oldMessages = _.filter(this.messages, (m) => !m.id);
        var wrapped = _(oldMessages).concat(messages);
        this.messages = wrapped.value();

        console.log('AlertStore messages:', this.messages);
    }

    onSetMessage(messages) {
        messages.map((item) => {
            var index = _.findIndex(this.messages, { 'id': item.id });
            this.messages.splice(index, 1);
        })
    }

    onLeave() {
        this.messages = _.filter(this.messages, (m) => m.id);
    }

}

export default alt.createStore(AlertStore, 'AlertStore');