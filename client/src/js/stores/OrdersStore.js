import alt from '../alt';
import OrdersAction from './../actions/OrdersAction';
var _ = require('lodash');


class OrdersStore {

    constructor() {
        this.orders = [];
        this.bindListeners({
            onGet: OrdersAction.GET
        });
    }

    onGet(orders){
        this.orders = orders;
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');