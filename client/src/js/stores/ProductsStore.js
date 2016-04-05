import alt from '../alt';
import ProductsAction from './../actions/ProductsAction';
var _ = require('lodash');

class ProductsStore {

    constructor() {
        this.products = [];
        this.upsell_products = [];
        this.product = {
            upsells: []
        };
        this.bindListeners({
            onGetAllProducts: ProductsAction.GET_ALL_PRODUCTS,
            onAddNewProduct: ProductsAction.ADD_NEW_PRODUCT,
            onEditProduct: ProductsAction.EDIT_PRODUCT,
            onRemoveProduct: ProductsAction.REMOVE_PRODUCT,
            onGetCurrentProduct: ProductsAction.GET_CURRENT_PRODUCT,
            onGetProductsForUpsell: ProductsAction.GET_PRODUCTS_FOR_UPSELL,
            onGetUpsellsProducts: ProductsAction.GET_UPSELLS_PRODUCTS,
            onClear: ProductsAction.CLEAR,
            onSetStateProduct: ProductsAction.SET_STATE_PRODUCT
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
        this.upsellFormState = product.isUpsell ? 'disable' : 'hide';
        this.product.upsell_id = product.isUpsell ? 1 : null;
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
                upsell_id: null,
                upsells: []
            };
        _.assign(this.product, data);
        this.upsellFormState = 'show';
    }

    onSetStateProduct(product) {
        _.assign(this.product, product);
    }

    onGetUpsellsProducts(upsells) {
        this.product.upsells = upsells;
        this.product.upsell_id = upsells[0].id;
    }

}

export default alt.createStore(ProductsStore, 'ProductsStore');