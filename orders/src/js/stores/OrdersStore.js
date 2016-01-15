import alt from '../alt';
import OrdersActions from './../actions/OrdersActions';
var _ = require('lodash');

class OrdersStore {

    constructor() {
        this.product = {};
        this.bindListeners({
            onAdd: OrdersActions.ADD,
            onGetProduct: OrdersActions.GET_PRODUCT
        });
    }

    onAdd(order){
        this.order = order;
    }

    onGetProduct(product) {
        debugger
        this.product = product;
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');