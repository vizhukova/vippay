import alt from '../alt';
import OrdersActions from './../actions/OrdersActions';
var _ = require('lodash');

class OrdersStore {

    constructor() {
        this.product = {};
        this.products = [];
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
            onSetMethod: OrdersActions.SET_METHOD,
            onGetBasket: OrdersActions.GET_BASKET
        });
    }

    onAdd(order){
        this.order = order;
        this.payed = order.total_price_order_rate == 0;
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

    onGetBasket(items) {
        this.products = items;

        this.products.map((item) => {
            if(!item.product.image) item.product.image = '/public/orders/images/noimage.png';
        })

        console.log('OrdersStore  onGetBasket', this.products)
    }

}

export default alt.createStore(OrdersStore, 'OrdersStore');