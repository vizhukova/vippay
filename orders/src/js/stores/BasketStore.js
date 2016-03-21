import alt from '../alt';
import BasketActions from './../actions/BasketActions';
var _ = require('lodash');

class BasketStore {

    constructor() {

        this.products = [];

        this.bindListeners({
            onGet: BasketActions.GET,
            onEdit: BasketActions.EDIT
        });
    }


    onGet(products) {
        this.products = products;
    }

    onEdit(product) {
        var index = _.findIndex(this.products, {id: product.id});
        this.products[index] = product;
    }


}

export default alt.createStore(BasketStore, 'BasketStore');