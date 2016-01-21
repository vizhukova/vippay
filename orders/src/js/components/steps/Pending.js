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
        var state = {current: this.props.delivery[e.target.value], condition: this.props.delivery[e.target.value].condition, price: this.props.delivery[e.target.value].price};
        this.setState(state);
        this.props.onChange(e);
    }

    componentDidMount() {
        this.setState({current: this.props.delivery[0], condition: this.props.delivery[0].condition, price: this.props.delivery[0].price});
    }


    render(){
        var self = this;
        return  <div className="description">
                <div>
                    <div>
                        <span><b>Условия доставки: </b></span>
                        <span>{this.state.condition}</span>
                    </div>
                    <div><span><b>Цена: </b></span>
                        <span>{this.state.price}</span>
                    </div>
                </div>
            <div className="form-group">
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

                </div>
    }


}

class Pending extends React.Component {

    constructor() {
        super();
        this.state = OrdersStore.getState();
        _.assign(this.state, {error: {}});
        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange(e) {
        console.log(e.target.name + ' == ' + e.target.value)
        if(this.state.delivery.telephone && this.state.delivery.telephone.length > 0) {
            this.setState({ error : _.omit(this.state.error, ['telephone']) });
        }
        var state = {};
        state[e.target.name] = e.target.value;
        _.assign(this.state.delivery, state);
        this.setState({});
    }

    onClick() {
        /*var order_num = localStorage.getItem('order_num');

        if(order_num) OrderActions.get(order_num);
        else*/
        if(!this.state.delivery.telephone || this.state.delivery.telephone.length == 0) {
            this.setState({error:
            {telephone: "Поле 'Телефон' обязательно для заполнения"
            }})
        }
        else {
            var delivery = this.state.product.delivery ? this.state.product.delivery[this.state.delivery_id] : {};
            var total = this.state.product.delivery ? parseInt(this.state.product.price) + parseInt(this.state.product.delivery[this.state.delivery_id].price) : this.state.product.price;
            _.assign(delivery, this.state.delivery, {total: total});
            console.log('Delivery', delivery);
            OrderActions.add({prod_id: this.state.prod_id, delivery: this.state.delivery});
        }
    }

    render() {
        console.log(this.state.product)
        var total = this.state.product.delivery ? parseInt(this.state.product.price) + parseInt(this.state.product.delivery[this.state.delivery_id].price) : this.state.product.price;
        return <div>
            <div>
                <div className="step"><span className="step-text">1</span></div>
                <div className="content-step row">
                    <div className="col-md-6">
                        <img className="img-responsive img-thumbnail image" src={this.state.product.image} />
                        <div className="field"><b>Название: </b> {this.state.product.name}</div>
                        <div className="field"><b>Цена: </b> {this.state.product.price + ' ' + this.state.product.currency_name}</div>
                        <div className="description image"><b>Описание: </b> {this.state.product.description}</div>
                    </div>
                    <div className="col-md-6">
                        <form className="">
                        {this.state.product.material ? <DeliverySelect delivery={this.state.product.delivery} onChange={this.onChange}/> : ""}
                        <div className="form-group">
                            <label>Электронная почта: </label>
                            <input type="email" name="email" className="form-control" onChange={this.onChange}
                                   placeholder="Введите электронную почту" />
                        </div>
                         <div className="form-group">
                            <label>ФИО: </label>
                            <input type="text" name="name" className="form-control" onChange={this.onChange}
                                   placeholder="Введите ФИО" />
                        </div>
                         <div className="form-group">
                            <label>Телефон<span className="text-danger"> * </span>: </label>
                            <input type="text" name="telephone" className="form-control" onChange={this.onChange}
                                   placeholder="(ХХХ) ХХ ХХ ХХХ" />
                        </div>
                        <div className={this.state.error.telephone ? 'alert alert-danger' : 'alert alert-danger hide'}>
                          <strong>Ошибка!</strong> {this.state.error.telephone}
                        </div>
                        <div className="form-group">
                            <label>Комментарий: </label>
                            <textarea name="comment" rows="5" className="form-control" onChange={this.onChange}
                                   placeholder="Комментарий" ></textarea>
                        </div>
                            <div className="pull-right text-warning text-uppercase"><b>Итоговая цена: {total}</b></div>
                            <div className="text-danger small pull-right">*Поля обязательные для заполнения</div>
                    </form>
                    </div>



                    <button type="button" className="btn btn-danger btn-lg" onClick={this.onClick}>Заказать</button>
                </div>
            </div>
           </div>
    }
}

export default Pending;
