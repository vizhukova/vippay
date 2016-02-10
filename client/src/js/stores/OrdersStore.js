import alt from '../alt';
import OrdersAction from './../actions/OrdersAction';
var _ = require('lodash');


class OrdersStore {

    constructor() {
        this.orders = [];
        this.bindListeners({
            onGet: OrdersAction.GET,
            setComplete: OrdersAction.SET_COMPLETE
        });
    }

    onGet(orders){
        this.orders = orders;
    }

    setComplete(order) {
        var index = _.findIndex(this.orders, { 'id': order.id });
        this.orders[index] = order;
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');