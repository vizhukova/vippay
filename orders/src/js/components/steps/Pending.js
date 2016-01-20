import React from 'react'
import {RoutingContext, Link} from 'react-router'
import Payment from './Payment'
import OrderActions from'./../../actions/OrdersActions'
import ApiActions from'./../../actions/ApiActions'
import OrdersStore from'./../../stores/OrdersStore'
import _  from 'lodash';

class DeliverySelect extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({current: this.props.delivery[e.target.value], condition: this.props.delivery[e.target.value].condition, price: this.props.delivery[e.target.value].price});
    }

    componentDidMount() {
        this.setState({current: this.props.delivery[0], condition: this.props.delivery[0].condition, price: this.props.delivery[0].price});
    }


    render(){
        var self = this;
        return  <div className="col-xs-5">
                <div>
                    <div>
                        <span><b>Условия доставки: </b></span>
                        <span>{this.state.condition}</span>
                    </div>
                    <div><span><b>Цена: </b></span>
                        <span>{this.state.price}</span>
                    </div>
                </div>
                <select className="form-control" id="sell"  name="delivery_id"
                            onChange={self.onChange}>
                        { this.props.delivery.map(function(item, index){
                            return <option
                                key={index}
                                value={index}
                            >{item.condition}</option>
                            })}
                    </select>
                </div>
    }


}

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
                    <img className="img-responsive img-thumbnail pull-left image col-xs-5" src={this.state.product.image} width="300px" height="auto"/>
                    <div className="field"><b>Название: </b> {this.state.product.name}</div>
                    <div className="field"><b>Цена: </b> {this.state.product.price}</div>
                    <div className="description"><b>Описание: </b> {this.state.product.description}</div>
                    {this.state.product.material ? <DeliverySelect delivery={this.state.product.delivery}/> : ""}
                    <form className="col-xs-7">
                        <div className="form-group">
                            <label>Электронная почта: </label>
                            <input type="email" name="email" className="form-control" onChange={this.onChange}
                                   placeholder="Введите электронную почту" />
                        </div>
                         <div className="form-group">
                            <label>Электронная почта: </label>
                            <input type="text" name="name" className="form-control" onChange={this.onChange}
                                   placeholder="Введите ФИО" />
                        </div>
                         <div className="form-group">
                            <label>Телефон: </label>
                            <input type="text" name="telephone" className="form-control" onChange={this.onChange}
                                   placeholder="(ХХХ) ХХ ХХ ХХХ" />
                        </div>
                        <div className="form-group">
                            <label>Комментарий: </label>
                            <textatea type="text" name="comment" className="form-control" onChange={this.onChange}
                                   placeholder="Комментарий" ></textatea>
                        </div>
                    </form>
                    <button type="button" className="btn btn-danger btn-lg" onClick={this.onClick}>Заказать</button>
                </div>
            </div>
           </div>
    }
}

export default Pending;
