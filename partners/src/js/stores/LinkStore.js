import alt from '../alt';
import LinkActions from './../actions/LinkActions';
var _ = require('lodash');

class LinkStore {

    constructor() {
        this.links = [];
        this.bindListeners({
            onGetLinks: LinkActions.GET_LINKS
        });
    }

    onGetLinks(links){
        this.links = links;
    }


}

export default alt.createStore(LinkStore, 'LinkStore');