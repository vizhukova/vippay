import React from 'react'
import {RoutingContext, Link} from 'react-router'
import Pending from './steps/Pending'
import Payment from './steps/Payments'
import OrdersStore from'./../stores/OrdersStore'
import OrderActions from'./../actions/OrdersActions'
import ModalWindow from'./../../../../common/js/ModalWindow/ModalWindow';

class Order extends React.Component {

    constructor() {
        super();
        this.state = OrdersStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        var id = location.search.split('?')[1];
        if(id) OrderActions.get(id);
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
                <ModalWindow />
                 <div className="panel panel-default col-md-10 col-md-offset-1 form-margin">
                  <div className="panel-body">
                    <div className="text-danger title">
                         {this.state.order.id ? 'Оплата заказа' : ' Оформление заказа'}
                    </div>
                  </div>
                    {this.state.order.id ? <Payment /> : <Pending />}
                </div>
            </div>
    }
}

export default Order;