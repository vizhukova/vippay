import alt from '../alt';
import ProductsAction from './../actions/ProductsActions';
var _ = require('lodash');

class ProductsStore {

    constructor() {
        this.products = [];
        this.bindListeners({
            onGetProducts: ProductsAction.GET_PRODUCTS
        });
    }

    onGetProducts(products){
        this.products = products;
    }


}

export default alt.createStore(ProductsStore, 'ProductsStore');