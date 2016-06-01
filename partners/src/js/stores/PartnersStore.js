import alt from '../alt';
import PartnersActions from './../actions/PartnersActions';

class PartnersStore {

    constructor() {
        this.partners_secondary = [];
        this.bindListeners({
            onGetById: PartnersActions.GET_BY_ID
        });
    }

    onGetById(partners){
        this.partners_secondary = partners;
    }


}

export default alt.createStore(PartnersStore, 'PartnersStore');