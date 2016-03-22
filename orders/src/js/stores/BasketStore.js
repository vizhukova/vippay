import alt from '../alt';
import BasketActions from './../actions/BasketActions';
var _ = require('lodash');

class BasketStore {

    constructor() {

        this.products = [];
        this.redirect = '#';

        this.bindListeners({
            onGet: BasketActions.GET,
            onEdit: BasketActions.EDIT
        });
    }


    onGet(products) {
        this.products = products;
    }

    onEdit(data) {
        this.products = data.products;
        this.redirect = data.redirect;
    }


}

export default alt.createStore(BasketStore, 'BasketStore');