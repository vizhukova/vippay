import alt from '../alt';
import ProductsAction from './../actions/ProductsAction';
var _ = require('lodash');

class ProductsStore {

    constructor() {
        this.products = [];
        this.upsell_products = [];
        this.product = {};
        this.bindListeners({
            onGetAllProducts: ProductsAction.GET_ALL_PRODUCTS,
            onAddNewProduct: ProductsAction.ADD_NEW_PRODUCT,
            onEditProduct: ProductsAction.EDIT_PRODUCT,
            onRemoveProduct: ProductsAction.REMOVE_PRODUCT,
            onGetCurrentProduct: ProductsAction.GET_CURRENT_PRODUCT,
            onGetProductsForUpsell: ProductsAction.GET_PRODUCTS_FOR_UPSELL,
            onClear: ProductsAction.CLEAR
        });

        this.upsellFormState;// hide disable show
    }

    onGetAllProducts(products){
        this.products = products;
    }

    onAddNewProduct(product) {
        this.products.push(product);
         this.products = _.flatten( this.products);
    }

    onGetCurrentProduct(product) {
        product.materials = product.materials || [];
        this.product = product;
        this.upsellFormState = product.upsell_id ? 'disable' : 'hide';
    }

    onEditProduct(product) {
        var index = _.findIndex(this.products, { 'id': product.id });
        this.products[index] = product;

    }

    onRemoveProduct(product) {
        if(!product) return;
        this.products = _.filter(this.products, function(obj) {
            return obj.id != product.id;
        });
    }

    onGetProductsForUpsell(products) {
        this.upsell_products = products;
        if(!  this.upsell_products.length) this.upsellFormState = 'hide';
    }

    onClear(data) {
        this.product =  {
                available: true,
                active: true,
                material: false,
                description: '',
                materials: [],
                upsell_id: null
            };
        _.assign(this.product, data);
        this.upsellFormState = 'show';
    }

}

export default alt.createStore(ProductsStore, 'ProductsStore');