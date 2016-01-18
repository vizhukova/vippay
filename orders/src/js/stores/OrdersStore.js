import alt from '../alt';
import OrdersActions from './../actions/OrdersActions';
var _ = require('lodash');

class OrdersStore {

    constructor() {
        this.product = {};
        this.order = {};
        this.bindListeners({
            onAdd: OrdersActions.ADD,
            onPay: OrdersActions.PAY,
            onGetProduct: OrdersActions.GET_PRODUCT
        });
    }

    onAdd(order){
        this.order = order;
    }

    onGetProduct(product) {
        this.product = product;
    }

    onPay(order) {
        console.log('PAYYYYY');
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');