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
        orders.map((order) => {
            order.product = _.findWhere(order.product, {id: +order.product_id});
        })
        console.log('OrdersStore orders:', orders);
    }

    setComplete(order) {
         var index = _.findIndex(this.orders, {id: order.id});
        order.product = this.orders[index].product;
        this.orders[index] = order;
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');