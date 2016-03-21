import React from 'react';
import {RoutingContext, Link} from 'react-router';
import Payment from './Payments';
import OrderActions from'./../../actions/OrdersActions';
import ApiActions from'./../../actions/ApiActions';
import OrdersStore from'./../../stores/OrdersStore';
import Alert from'./../../../../../common/js/Alert/Alert';
import AlertActions from'./../../../../../common/js/Alert/AlertActions';
import ModalActions from'./../../../../../common/js/ModalWindow/ModalActions';
import NumberInput from'./../../../../../common/js/NumberInput';
import List from'./../../../../../common/js/List';
import _  from 'lodash';
import $  from 'jquery';

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
        return  <div className="description boxed">
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

class PendingItem extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log('PENDING ITEM', this.props)
        return <div>
                    <div className="col-md-6">
                        <img className="img-responsive img-thumbnail image" src={this.props.product.image} />
                        <div className="field"><b>Название: </b> {this.props.product.name}</div>
                        <div className="field"><b>Цена: </b> {this.props.product.price + ' ' + this.props.product.currency_name}</div>
                        <div className="description image"><b>Описание: </b> <pre>{this.props.product.description}</pre></div>
                    </div>    
                        <div className="col-md-6">
                            {this.props.product.material ? <DeliverySelect delivery={this.props.product.delivery} onChange={this.props.onChange}/> : ""}
                        </div>
                    </div>
    }
}

class BasketItem extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log('BASKET ITEM', this.props)
        return <tr>
            <td><img src={this.props.item.product.image} width="100px" height="auto"/></td>
            <td>{this.props.item.product.name}</td>
            <td>{this.props.item.product.description}</td>
            <td>{this.props.item.product.price}</td>
            <td>{this.props.item.quantity}</td>
        </tr>
    }
}

class Pending extends React.Component {

    constructor() {
        super();
        this.state = OrdersStore.getState();
        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onContinue = this.onContinue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPromoChange = this.onPromoChange.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.finishPending = this.finishPending.bind(this);
    }

    componentDidMount() {
        var id = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
        var isBasket = window.location.pathname.indexOf('basket') != -1;

        this.setState({prod_id: id, isBasket: isBasket});
        OrdersStore.listen(this.update);

        if(isBasket)  OrderActions.getBasket(id);
        else OrderActions.getProduct(id);
    }

    componentWillUnmount() {
        OrdersStore.unlisten(this.update);
    }

    componentDidUpdate(val) {
        console.log('UPDATEDDDDDDDDD', val);
    }

    update(state){
        debugger
        //_.assign(this.state, state);
        this.setState(state);
        //this.forceUpdate();
    }

    onPromoChange(e) {
        this.state.promo = e.target.value;
    }

    onChange(e) {
        var state = {};

        if(e.target.name == 'delivery_id')  _.assign(this.state, {delivery_id: e.target.value});

        state[e.target.name] = e.target.value;
        _.assign(this.state.delivery, state);

        this.setState({});
    }

    onClick() {
        AlertActions.hide();
    }

    checkFields() {
         var self = this;
        var telephone = new RegExp(/^\d[\d\(\)\ -]{4,14}\d$/);
        var email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if(!this.state.delivery.telephone || _.trim(this.state.delivery.telephone).length == 0 ||
            !this.state.delivery.name || _.trim(this.state.delivery.name).length == 0 ||
            !this.state.delivery.email || _.trim(this.state.delivery.email).length == 0) {
            AlertActions.set({
                     type: 'error',
                     title: 'Ошибка',
                     text: 'Все обязательные поля должны быть заполнены'
             })
        }
        else if(! telephone.test(this.state.delivery.telephone) ) {
             AlertActions.set({
                     type: 'error',
                     title: 'Ошибка',
                     text: 'Проверьте правильность заполнения поле "телефон"'
             })

        }
        else if(! email.test(this.state.delivery.email) ) {
            AlertActions.set({
                     type: 'error',
                     title: 'Ошибка',
                     text: 'Проверьте правильность заполнения поле "электронная почта"'
             })

        }

        else {
            return true;
        }

        return false;
    }

    onContinue() {
       if(! this.checkFields()) return;

        var delivery = this.state.product.delivery ? this.state.product.delivery[this.state.delivery_id] : {};
        var total = 0;
        var currency;

        if(this.state.isBasket) {
            this.state.products.map((item) => total += item.product.price * item.quantity);
            currency = 'RUB';
        } else {
            total = this.state.product.delivery && this.state.product.delivery.length > 0 ? parseFloat(this.state.product.price) + parseFloat(this.state.product.delivery[this.state.delivery_id].price) : this.state.product.price;
            currency = this.state.product.currency_name;
        }

            _.assign(delivery, this.state.delivery, {total: total});
            console.log('Delivery', delivery);

            var prod_id = [];

            if(this.state.isBasket) {
                this.state.products.map((item) => {prod_id.push(item.product.id)});
            } else {
                prod_id = [this.state.prod_id];
            }
            debugger
            if(this.state.promo && _.trim(this.state.promo)) { //if promo code
                OrderActions.getPromo({code: this.state.promo, product_id: prod_id}).then((data) => {

                    var discountTotal = 0;

                    if(this.state.isBasket) {
                        var a = this.state.products.map((item) => {

                            if(_.indexOf(data.products, item.product.id) > -1) {
                                discountTotal += ( item.product.price - (item.product.price * data.promo.discount / 100) ) * item.quantity;
                            } else {
                                discountTotal += item.product.price * item.quantity;
                            }

                        })
                    } else {

                        discountTotal = total - data.promo.discount*total/100;

                    }

                    ModalActions.set({data: {messages: [` Общая сумма заказа сейчас ${total} ${currency}.`,
                                                        `Со скидкой ${data.promo.discount}% составляет ${discountTotal} ${currency}`]
                                            , onContinue: this.finishPending
                                            , title: `Подтвердите применение скидки по промо коду.`
                                            , forComponent: {total: discountTotal, discount: data.promo.discount}
                                            }
                                    , name: 'Message'});

                }).catch((err) => {
                    ModalActions.set({data: {message: err.message}, name: 'MessageError'});
                })
            } else {
                this.finishPending();
            }


    }

    finishPending(data) {

        ModalActions.hide();

        data = data || {};
         var delivery = this.state.product.delivery && this.state.product.delivery.length ? this.state.product.delivery[this.state.delivery_id] : {};
        var total = 0;

         if(this.state.isBasket && !data.total) {
            this.state.products.map((item) => total += item.product.price * item.quantity);
        } else {
            total = ! isNaN(data.total) ? data.total : (this.state.product.delivery && this.state.product.delivery.length > 0 ? parseInt(this.state.product.price) + parseInt(this.state.product.delivery[this.state.delivery_id].price) : this.state.product.price);
        }

            _.assign(delivery, this.state.delivery, {total: total});
        var toSend = {delivery: delivery};
        var self = this;


        var prod_id = [];
        if(this.state.isBasket) {
            this.state.products.map((item) => {prod_id.push(item.product.id)});
        } else {
            prod_id = [this.state.prod_id];
        }

        if(this.state.promo) {
            toSend.promo = {code: this.state.promo, discount: data.discount};
        } else {
            toSend.promo = {};
        }

        if(this.state.product.isUpsell) {
                OrderActions.getUpsellProducts(this.state.prod_id).then((upsells) => {
                    upsells.map((u) => {
                       u.currency_name = self.state.product.currency_name;
                    });

                    _.assign(toSend, {upsells: upsells, product: this.state.product});
                    ModalActions.set({data: toSend, name: 'Upsells'});
                });
            } else {
                    _.assign(toSend, {prod_id: prod_id});
                    OrderActions.add(toSend);
            }
    }

    render() {
        var total;
        var currency;

        console.log('PENDING', this.state);

        if(this.state.isBasket) {
            total = 0;
            this.state.products.map((item) => total += item.product.price * item.quantity );
            //this.state.products.length ? this.state.products.reduce((prev, curr) => parseFloat(prev.product.price) + parseFloat(curr.product.price)) : [];
            currency = 'RUB';
        } else {
            total = this.state.product.delivery && this.state.product.delivery.length > 0 ? parseFloat(this.state.product.price) + parseFloat(this.state.product.delivery[this.state.delivery_id].price) : this.state.product.price;
            currency = this.state.product.currency_name;
        }

        return <div>
            <div>
                <div className="content-step row">
                     <Alert />
                    {
                     this.state.isBasket ?

                     <div className="col-md-6">
                         <List
                            title="Заказ"
                            items={this.state.products}
                            itemComponent={BasketItem}
                            isPaginate={true}
                            thead={[
                                {name: 'Изображение', key: ''},
                                {name: 'Название', key: ''},
                                {name: 'Описание', key: ''},
                                {name: 'Цена', key: ''},
                                {name: 'Количество', key: ''}
                            ]}
                        />
                     </div>
                    :<PendingItem product={this.state.product} onChange={this.onChange} />
                    }
                  
                    <div className="col-md-6">
                        <form className="">
            
                            <div className="form-group">
                            <label>Электронная почта:<span className="text-danger"> * </span> </label>
                            <input type="email" name="email" className="form-control"
                                   onChange={this.onChange}
                                   onClick={this.onClick}
                                   placeholder="Введите электронную почту" />
                        </div>

                         <div className="form-group">
                            <label>ФИО:<span className="text-danger"> * </span> </label>
                            <input type="text" name="name" className="form-control"
                                   onChange={this.onChange}
                                   onClick={this.onClick}
                                   placeholder="Введите ФИО" />
                        </div>

                         <div className="form-group">
                            <label>Телефон: <span className="text-danger"> * </span> </label>
                            <input type="text" name="telephone" className="form-control"
                                   onChange={this.onChange}
                                   onClick={this.onClick}
                                   id="telephone" placeholder="(ХХХ) ХХ ХХ ХХХ" />
                        </div>
                        <div className="form-group">
                            <label>Комментарий: </label>
                            <textarea name="comment" rows="5" className="form-control" onChange={this.onChange}
                                   placeholder="Комментарий" />
                        </div>

                        <div className="form-inline">
                            <div className="form-group">
                            <label>Промо код: </label>
                            <input type="text" name="promo_code" onChange={this.onPromoChange} />
                        </div>

                        </div>

                            <div className="text-warning text-uppercase pull-right"><b>Итоговая цена: {`${total} ${currency}`}</b></div><br/>
                            <div className="text-danger small pull-right">*Поля обязательные для заполнения</div><br/>
                    </form>
                    </div>



                    <button type="button" className="btn btn-danger btn-lg pull-right btn-order" onClick={this.onContinue}>Оформить</button>
                </div>
            </div>
           </div>
    }
}

export default Pending;
