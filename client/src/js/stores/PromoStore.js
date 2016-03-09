import alt from '../alt';
import PromoAction from './../actions/PromoAction';
var _ = require('lodash');


class PromoStore {

    constructor() {
        this.promos = [];
        this.promo = {};
        this.type = 'before'; //before during - enum

        this.bindListeners({
            onGet: PromoAction.GET,
            onGetById: PromoAction.GET_BY_ID,
            onGetCurrentCat: PromoAction.EDIT,
            onDeleteCat: PromoAction.ADD,
            onEditCategory: PromoAction.DELETE
        });
    }

    onGet() {}
    onGetById() {}
    onGetCurrentCat() {}
    onDeleteCat() {}
    onEditCategory() {}

}

export default alt.createStore(PromoStore, 'PromoStore');