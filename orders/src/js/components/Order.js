import React from 'react'
import {RoutingContext, Link} from 'react-router'
import Pending from './steps/Pending'
import Payment from './steps/Payment'

class Order extends React.Component {

    constructor() {
        super();
        this.state = {};
    }


    render() {
        return <div className="panel panel-default col-md-10 col-md-offset-1 form-margin">
                  <div className="panel-body">
                    <div className="text-danger title">Заказ</div>
                  </div>
                  <Pending />
                </div>
    }
}

export default Order;