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

        orders.map((order) => {

            order.product_title = '';

            order.product.map((product, index) => {
                if(index > 0) order.product_title += '+';
                order.product_title += product.name;
            });

        });

        this.orders = orders;
    }

    setComplete(order) {
         var index = _.findIndex(this.orders, {id: order.id});
        order.product = this.orders[index].product;

        _.assign( this.orders[index], order);
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');