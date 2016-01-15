import React from 'react'
import {RoutingContext, Link} from 'react-router'
import Payment from './Payment'
import OrderActions from'./../../actions/OrdersActions'
import ApiActions from'./../../actions/ApiActions'
import OrdersStore from'./../../stores/OrdersStore'
import _  from 'lodash';

class Pending extends React.Component {

    constructor() {
        super();
        this.state = OrdersStore.getState();

        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        var id = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);

        this.setState({prod_id: id});
        OrdersStore.listen(this.update);
        OrderActions.getProduct(id);
    }

    componentWillUnmount() {
        OrdersStore.unlisten(this.update);
    }

    update(state){
        _.assign(this.state, state);
        this.setState({});
    }

    onClick() {
        var order_num = localStorage.getItem('order_num');

        if(order_num) OrderActions.get(order_num);
        else OrderActions.add(this.state.prod_id);
    }

    render() {
        return <div>
            <div>
                <div className="step"><span className="step-text">1</span></div>
                <div className="content-step">
                    <img className="img-responsive img-thumbnail pull-left image" src={this.state.product.image} width="300px" height="auto"/>
                    <div className="field"><b>Название: </b> {this.state.product.name}</div>
                    <div className="field"><b>Цена: </b> {this.state.product.price}</div>
                    <div className="description"><b>Описание: </b> {this.state.product.description}</div>
                    <button type="button" className="btn btn-danger btn-lg" onClick={this.onClick}>Заказать</button>
                </div>
            </div>
           </div>
    }
}

export default Pending;
