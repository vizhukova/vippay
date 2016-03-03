import alt from '../alt';
import ProductsAction from './../actions/ProductsAction';
var _ = require('lodash');

class ProductsStore {

    constructor() {
        this.products = [];
        this.product = {};
        this.bindListeners({
            onGetAllProducts: ProductsAction.GET_ALL_PRODUCTS,
            onAddNewProduct: ProductsAction.ADD_NEW_PRODUCT,
            onEditProduct: ProductsAction.EDIT_PRODUCT,
            onRemoveProduct: ProductsAction.REMOVE_PRODUCT,
            onGetCurrentProduct: ProductsAction.GET_CURRENT_PRODUCT,
            onGet: ProductsAction.GET
        });
    }

    onGetAllProducts(products){
        this.products = products;
    }

    onAddNewProduct(product) {

        this.products.push(product);
        this.onResetProduct();
    }

    onGetCurrentProduct(product) {
        product.materials = product.materials || [];
        this.product = product;
    }

    onEditProduct(product) {
        var self = this;
        if(product instanceof Error) {

        } else {
            var index = _.findIndex(this.products, { 'id': product.id });
            this.products[index] = product;
        }

        this.onResetProduct();
    }

    onRemoveProduct(product) {
        if(!product) return;
        this.products = _.filter(this.products, function(obj) {
            return obj.id != product.id;
        });
    }

    onResetProduct() {
        this.product = {};
    }

    onGet(products) {
        this.products = products;
    }

}

export default alt.createStore(ProductsStore, 'ProductsStore');