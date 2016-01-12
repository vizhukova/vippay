import alt from '../alt';
import ProductsAction from './../actions/ProductsAction';

class ProductsStore {

    constructor() {
        this.products = [];
        this.bindListeners({
            onGetAllProducts: ProductsAction.GET_ALL_PRODUCTS,
            onAddNewProduct: ProductsAction.ADD_NEW_PRODUCT
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
             this.products.push(product)
        }
    }

}

export default alt.createStore(ProductsStore, 'ProductsStore');