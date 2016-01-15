import React from 'react'
import {RoutingContext, Link} from 'react-router'
import Pending from './steps/Pending'
import Payment from './steps/Payment'
import OrdersStore from'./../stores/OrdersStore'

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
        return <div className="panel panel-default col-md-10 col-md-offset-1 form-margin">
                  <div className="panel-body">
                    <div className="text-danger title">Заказ</div>
                  </div>
                    {this.state.order.id ? <Payment /> : <Pending />}
                </div>
    }
}

export default Order;