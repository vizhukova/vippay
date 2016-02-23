import alt from '../alt';
import PartnerLinksAction from './../actions/PartnerLinksAction';
var _ = require('lodash');

class PartnerLinksStore {

    constructor() {
        this.links = [];
        this.product = {};
        this.bindListeners({
            onGetAll: PartnerLinksAction.GET_ALL
        });
    }

    onGetAll(links){
        this.links = links;
    }

}

export default alt.createStore(PartnerLinksStore, 'PartnerLinksStore');