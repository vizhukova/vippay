import alt from '../alt';
import PromoAction from './../actions/PromoAction';
import ProductsAction from './../actions/ProductsAction';
var _ = require('lodash');
var moment = require('moment');


class PromoStore {

    constructor() {
        this.promos = [];
        this.promo = {
            products: [],
            type : 'until', //until during - enum
            discount: 0
        };
        this.products = [];
        this.checkAll = false;

        this.bindListeners({
            onGet: PromoAction.GET,
            onGetById: PromoAction.GET_BY_ID,
            onAdd: PromoAction.ADD,
            onGetProducts: ProductsAction.GET,
            onClear: PromoAction.CLEAR,
            onDelete: PromoAction.DELETE
        });
    }

    onGet(promos) {
        this.promos = promos;
    }

    onGetById(promo) {
        this.promo = promo;
    }

    onAdd(promo) {
        this.promos.push(promo);
    }

    onGetProducts(products) {
        this.products = products;
    }

    onClear() {
         this.promo = {
            products: [],
            type : 'until' //until during - enum
        };
    }

    onDelete(promo) {
        this.promos = _.filter(this.promos, (p) => promo.id != p.id);
    }

}

export default alt.createStore(PromoStore, 'PromoStore');