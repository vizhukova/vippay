import alt from '../alt';
import PartnerLinksAction from './../actions/PartnerLinksAction';
var _ = require('lodash');

class PartnerLinksStore {

    constructor() {
        this.links = [];
        this.link = {};
        this.bindListeners({
            onGet: PartnerLinksAction.GET,
            onAdd: PartnerLinksAction.ADD,
            onSet: PartnerLinksAction.SET,
            onGetCurrent: PartnerLinksAction.GET_CURRENT,
            onRemove: PartnerLinksAction.REMOVE
        });
    }

    onGet(links){
        this.links = links;
        //console.log('PartnerLinksStore links: ', links);
    }

    onAdd(link) {
        this.links.push(link);
    }

    onSet(link) {
        var index = _.findIndex(this.links, {id: link.id});
        this.links[index] = link;
    }

    onGetCurrent(link) {
        link.materials = link.materials || [];

        this.link = link;
    }

    onRemove(link) {
        this.links = _.filter(this.links, (item) => item.id != link.id);
    }

}

export default alt.createStore(PartnerLinksStore, 'PartnerLinksStore');