import React from 'react'
import {RoutingContext, Link} from 'react-router'
import OrdersStore from'./../../stores/OrdersStore'
import OrdersAction from'./../../actions/OrdersActions'

class Order extends React.Component {

    constructor() {
        super();
        this.state = OrdersStore.getState();
        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
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
        return <div>
                 <div className="content-step">
                    <div className="order-num title"><b>ID заказа: </b> {this.state.order.id}</div>
                    <button type="button" className="btn btn-danger btn-lg pull-right btn-order" onClick={this.onClick}>Оплатить</button>
                 </div>
           </div>
    }
}

export default Order;