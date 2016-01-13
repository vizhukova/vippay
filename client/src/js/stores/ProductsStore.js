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
            onGetCurrentProduct: ProductsAction.GET_CURRENT_PRODUCT,
            onEditProduct: ProductsAction.EDIT_PRODUCT,
            onRemoveProduct: ProductsAction.REMOVE_PRODUCT
        });
    }

    onGetAllProducts(products){
        this.products = products;
    }

    onAddNewProduct(product) {
        if(product instanceof Error) {
            console.log(JSON.parse(product.message).category)
                JSON.parse(product.message).category
                .forEach(function(i){alert(i)})
            return
        } else {
             this.products.push(product);
        }
    }

    onGetCurrentProduct(product) {
        this.product = product;
    }

    onEditProduct(product) {
        if(product instanceof Error) {
            console.log(JSON.parse(product.message).category)
                JSON.parse(product.message).category
                .forEach(function(i){alert(i)})
            return
        } else {
            var index = _.findIndex(this.products, { 'id': product.id });
            this.products[index] = product;
        }
    }

    onRemoveProduct(product) {
        if(!product) return;
        this.products = _.filter(this.products, function(obj) {
            return obj.id != product.id;
        });
    }

}

export default alt.createStore(ProductsStore, 'ProductsStore');