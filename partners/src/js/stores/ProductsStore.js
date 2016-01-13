import alt from '../alt';
import ProductsAction from './../actions/ProductsActions';
var _ = require('lodash');

class ProductsStore {

    constructor() {
        this.products = [];
        this.bindListeners({
            onGetAll: ProductsAction.GET_ALL
        });
    }

    onGetAll(products){
        this.products = products;
    }

}

export default alt.createStore(ProductsStore, 'ProductsStore');