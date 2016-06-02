import alt from '../alt';
import PartnerLinksActions from './../actions/PartnerLinksActions';

class PartnerLinksStore {

    constructor() {
        this.partner_links = [];
        this.bindListeners({
            onGet: PartnerLinksActions.GET
        });
    }

    onGet(partner_links){
        this.partner_links = partner_links;
    }


}

export default alt.createStore(PartnerLinksStore, 'PartnerLinksStore');