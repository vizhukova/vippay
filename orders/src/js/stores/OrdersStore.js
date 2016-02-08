import alt from '../alt';
import OrdersActions from './../actions/OrdersActions';
var _ = require('lodash');

class OrdersStore {

    constructor() {
        this.product = {};
        this.order = {};
        this.delivery_id = 0;
        this.delivery = {};
        this.method = {};
        this.payed = false;
        this.bindListeners({
            onAdd: OrdersActions.ADD,
            onGet: OrdersActions.GET,
            onPay: OrdersActions.PAY,
            onGetProduct: OrdersActions.GET_PRODUCT,
            onGetMethod: OrdersActions.GET_METHOD
        });
    }

    onAdd(order){
        this.order = order;
    }

    onGet(order){
        this.order = order;
    }

    onGetProduct(product) {
        if(!product.image) product.image = '/public/orders/images/noimage.png';
        this.product = product;
    }

    onPay(order) {
        console.log('PAYYYYY');
        this.payed = true;
    }

    onGetMethod(data) {
        this.method = data;
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');