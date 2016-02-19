import alt from '../alt';
import ProductsAction from './../actions/PartnersAction';
var _ = require('lodash');

class PartnersStore {

    constructor() {
        this.partners = [];
       // this.fee = [];
        this.bindListeners({
            onGetAll: ProductsAction.GET_ALL,
            onEdit: ProductsAction.EDIT,
            onGetFee: ProductsAction.GET_FEE,
            onSetFee: ProductsAction.SET_FEE
        });
    }

    onGetAll(partners){
        this.partners = partners;
    }

    onEdit(partner) {
        var index = _.findIndex(this.partners, { 'id': partner.id });
        this.partners[index] = partner;
    }

    onGetFee(fee) {
        this.partners.map((partner) => {
            partner.fee = _.findWhere(fee, {partner_id: partner.id});
        });

        //this.fee = fee;
    }

    onSetFee(fee) {
        debugger
        var index = _.findIndex(this.partners, {id: fee.partner_id});
        if(index >= 0)this.partners[index].fee = fee;

    }

}

export default alt.createStore(PartnersStore, 'PartnersStore');