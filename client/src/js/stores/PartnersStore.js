import alt from '../alt';
import ProductsAction from './../actions/PartnersAction';
var _ = require('lodash');

class PartnersStore {

    constructor() {
        this.partners = [];
        this.bindListeners({
            onGetAll: ProductsAction.GET_ALL
        });
    }

    onGetAll(partners){
        this.partners = partners;
    }

}

export default alt.createStore(PartnersStore, 'PartnersStore');