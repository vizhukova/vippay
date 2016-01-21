import alt from '../alt';
import ProductsAction from './../actions/PartnersAction';
var _ = require('lodash');

class PartnersStore {

    constructor() {
        this.partners = [];
        this.bindListeners({
            onGetAll: ProductsAction.GET_ALL,
            onEdit: ProductsAction.EDIT
        });
    }

    onGetAll(partners){
        this.partners = partners;
    }

    onEdit(partner) {
        var index = _.findIndex(this.partners, { 'id': partner.id });
        this.partners[index] = partner;
    }

}

export default alt.createStore(PartnersStore, 'PartnersStore');