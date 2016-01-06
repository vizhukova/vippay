import alt from '../alt';
import ProductsAction from './../actions/ProductsAction';

class ProductsStore {

    constructor() {
        this.products = [];
        this.bindListeners({
            onCheck: ProductsAction.GET_PRODUCTS_BY_CATEGORY
        });
    }

    onCheck(products){
        this.products = products;
    }

}

export default alt.createStore(ProductsStore, 'ProductsStore');