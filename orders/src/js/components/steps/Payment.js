import React from 'react'
import {RoutingContext, Link} from 'react-router'
import OrdersStore from'./../../stores/OrdersStore'
import OrdersAction from'./../../actions/OrdersActions'
import Interkassa from'./../Interkassa'
import Yandex from'./../Yandex'

class Order extends React.Component {

    constructor() {
        super();
        this.state = OrdersStore.getState();
        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        OrdersAction.getMethod({order_id: this.state.order.id, method: 'yandex', client_id: this.state.order_client_id});
        OrdersStore.listen(this.update);
    }

    componentWillUnmount() {
        OrdersStore.unlisten(this.update);
    }

    onClick() {
        OrdersAction.pay(this.state.order.id)
    }

    update(state) {
        if(state.payed) window.location = 'http://img.ezinearticles.com/blog/payed-invoice.jpg';
        this.setState(state);
    }

    render() {
        console.log('payment state', this.state)
        return <div>
                 <div className="content-step">
                    <div className="order-num title"><b>ID заказа: </b> {this.state.order.id}</div>
                     <Yandex method={this.state.method} />
                    <button type="button" className="btn btn-danger btn-lg pull-right btn-order" onClick={this.onClick}>Оплатить</button>
                 </div>
           </div>
    }
}

export default Order;