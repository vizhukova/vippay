import alt from '../alt';
import OrdersActions from './../actions/OrdersActions';
var _ = require('lodash');

class OrdersStore {

    constructor() {
        this.product = {};
        this.order = {};
        this.delivery_id = 0;
        this.delivery = {};
        this.yandex = {};
        this.interkassa = {};
        this.payed = false;
        this.payments = [];

        this.bindListeners({
            onAdd: OrdersActions.ADD,
            onGet: OrdersActions.GET,
            onPay: OrdersActions.PAY,
            onGetProduct: OrdersActions.GET_PRODUCT,
            onGetMethodYandex: OrdersActions.GET_METHOD_YANDEX,
            onGetMethodInterkassa: OrdersActions.GET_METHOD_INTERKASSA,
            onGetPayments: OrdersActions.GET_PAYMENTS,
            onSetMethod: OrdersActions.SET_METHOD
        });
    }

    onAdd(order){
        this.order = order;
    }

    onGet(order){
        debugger
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

    onGetMethodYandex(data) {
        this.yandex = data;
    }

    onGetMethodInterkassa(data) {
        this.interkassa = data;
    }

    onGetPayments(data) {
        this.payments = data;
    }

    onSetMethod(data) {
        this.order = data;
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');