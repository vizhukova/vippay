import alt from '../alt';
import PartnersAction from './../actions/PartnersAction';
var _ = require('lodash');

class PartnersStore {

    constructor() {
        this.partners = [];
        this.partner_query = '';
       // this.fee = [];
        this.bindListeners({
            onGetAll: PartnersAction.GET_ALL,
            onEdit: PartnersAction.EDIT,
            onGetFee: PartnersAction.GET_FEE,
            onSetFee: PartnersAction.SET_FEE,
            onGetPartnerQuery: PartnersAction.GET_PARTNER_QUERY,
            onEditFeeQuery: PartnersAction.EDIT_FEE_QUERY
        });
    }

    onGetAll(partners){
        this.partners = partners;
    }

    onEdit(partner) {

        var index = _.findIndex(this.partners, { 'id': partner.id });
        _.assign(this.partners[index], partner);
    }

    onGetFee(fee) {
        this.partners.map((partner) => {
            partner.fee = _.findWhere(fee, {partner_id: partner.id});
        });

    }

    onSetFee(fee) {
        console.log('SetFee', fee);
        var index = _.findIndex(this.partners, {id: fee.partner_id});
        if(index >= 0)this.partners[index].fee = fee;

    }

    onGetPartnerQuery(data) {
        this.partner_query = data.partner_query;
        console.log('PartnersStore onGetPartnerQuery', data)
    }

    onEditFeeQuery(data) {
        this.partner_query = data.partner_query;
        this.partner_query = data.partner_query;console.log('PartnersStore onEditFeeQuery', data)

    }

}

export default alt.createStore(PartnersStore, 'PartnersStore');