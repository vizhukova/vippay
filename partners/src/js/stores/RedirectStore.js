import alt from '../alt';
import RedirectAction from './../actions/RedirectActions';
var _ = require('lodash');

class RedirectStore {

    constructor() {
        this.bindListeners({
            onRedirect: RedirectAction.REDIRECT
        });
    }

    onRedirect(link){
        this.link = link;
    }

}

export default alt.createStore(RedirectStore, 'RedirectStore');