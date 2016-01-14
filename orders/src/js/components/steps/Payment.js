import React from 'react'
import {RoutingContext, Link} from 'react-router'

class Order extends React.Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {


    }

    update(state){

    }

    render() {
        return <div>
                <div className="step"><span className="step-text">2</span></div>
                 <div className="content-step">
                    <div className="order-num">Номер заказа</div>
                    <button type="button" className="btn btn-danger btn-lg order">Заказать</button>
                 </div>
           </div>
    }
}

export default Order;