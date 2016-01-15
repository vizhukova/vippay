import React from 'react'
import {RoutingContext, Link} from 'react-router'
import OrdersStore from'./../../stores/OrdersStore'

class Order extends React.Component {

    constructor() {
        super();
        this.state = OrdersStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        OrdersStore.listen(this.update);
    }

    componentWillUnmount() {
        OrdersStore.unlisten(this.update);
    }

    update(state) {
        this.setState(state);
    }

    render() {
        return <div>
                <div className="step"><span className="step-text">2</span></div>
                 <div className="content-step">
                    <div className="order-num"><b>ID заказа: </b> {this.state.order.id}</div>
                    <button type="button" className="btn btn-danger btn-lg order">Заказать</button>
                 </div>
           </div>
    }
}

export default Order;