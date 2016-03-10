import alt from '../alt';
import PromoAction from './../actions/PromoAction';
import ProductsAction from './../actions/ProductsAction';
var _ = require('lodash');


class PromoStore {

    constructor() {
        this.promos = [];
        this.promo = {
            products: [],
            type : 'until' //until during - enum
        };
        this.products = [];

        this.bindListeners({
            onGet: PromoAction.GET,
            onAdd: PromoAction.ADD,
            onGetProducts: ProductsAction.GET
        });
    }

    onGet(promos) {
        this.promos = promos;
    }

    onAdd(promo) {
        this.promos.push(promo);
    }

    onGetProducts(products) {
        this.products = products;
    }

}

export default alt.createStore(PromoStore, 'PromoStore');