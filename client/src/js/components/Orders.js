import React from 'react';
import OrdersActions from'./../actions/OrdersAction';
import OrdersStore from'./../stores/OrdersStore';
import SettingsStore from'./../stores/SettingsStore';
import List from'./../../../../common/js/List';
import Select from'./../../../../common/js/Select';
import _  from 'lodash';
import moment  from 'moment';


class OrderItem extends React.Component {
    
    constructor() {
        super();

         this.statuses = {
            pending: 'Заказ оформлен',
            complete: 'Заказ оплачен',
            leaving: 'Заказ завершен'
        }

        this.setComplete = this.setComplete.bind(this);
        this.update = this.update.bind(this);
    }

    update(state) {
        this.setState(state);
    }

    setComplete() {
        if(this.props.item.step == 'complete')OrdersActions.setComplete({step: 'pending', id:this.props.item.id});
        else OrdersActions.setComplete({step: 'complete', id:this.props.item.id});
    }
    
    render() {
        var complete = "glyphicon glyphicon-ok-circle btn btn-default btn-action";
        var notComplete = "glyphicon glyphicon-ban-circle btn btn-danger btn-action";

        return <tr>
            <td>{this.props.item.login ? this.props.item.login : "-"}</td>
            <td>{moment(this.props.item.created_at).format("MM.DD.YY HH:mm")}</td>
            <td><a href={this.props.item.product.product_link} target="_blank">{this.props.item.product.name}</a></td>
            <td>{this.props.item.delivery_price}</td>
            <td><button type="button" className={` ${this.props.item.step == 'complete' ? complete : notComplete}`} onClick={this.setComplete}></button></td>
            <td>{`${this.props.item.product_price} ${this.props.item.currency}`}</td>
        </tr>
    }
    
}
    
    
class Orders extends React.Component {

    constructor(){
        super();
        this.state = OrdersStore.getState();
        _.assign(this.state, SettingsStore.getState());
        _.assign(this.state, {
            isBasicRate: "false",
            values: [
                {
                    isBasicRate: 'в валюте заказа',
                    basic: 'false'
                },
                {
                    isBasicRate: 'в основной валюте',
                    basic: 'true'
                }

            ]
        });
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        OrdersStore.listen(this.update);
        SettingsStore.listen(this.update);
        OrdersActions.get();
    }

    componentWillUnmount() {
        OrdersStore.unlisten(this.update);
        SettingsStore.unlisten(this.update);
    }

    update(state) {
        console.log(state)
        this.setState(state);
    }

    onChange(e) {
        var state = {}
        state[e.target.name] = e.target.value;
        console.log(state)
        _.assign(this.state, state);
        this.setState({});
    }



    render(){
        var self = this;
        var isBasicRate = this.state.isBasicRate === 'true';
        var isPaginate = this.props.isPaginate != undefined ? this.props.isPaginate : true;
        this.state.orders.map((order) => {
            if(isBasicRate) {

                var basic_currency = this.state.currencies[order.basic_currency_id - 1];
                basic_currency = basic_currency ? basic_currency.name : '';

                order.product_price = order.product_price_base_rate;
                order.delivery_price = order.delivery_price_base_rate;
                order.total_price = order.total_price_base_rate;
                order.currency = basic_currency;
            } else {
                order.product_price = order.product_price_order_rate;
                order.delivery_price = order.delivery_price_order_rate;
                order.total_price = order.total_price_order_rate;
                order.currency = order.product.currency_name;
            }
        })
        
        return <List
            title="Заказы"
            error={this.state.error}
            items={this.state.orders}
            itemComponent={OrderItem}
            isPaginate={isPaginate}
            thead={[
                {name: 'Партнер', key: 'login'},
                {name: 'Дата', key: 'created_at'},
                {name: 'Продукт', key: 'product.product_link'},
                {name: 'Доставка', key: 'product.delivery.price'},
                {name: 'Оплачен', key: ''},
                {name: 'Цена', key: 'product.price'}
            ]}
            >
            <Select values={this.state.values} className="col-md-3 pull-right"
                    current_value={ _.findWhere(this.state.values, {isBasicRate: this.state.isBasicRate}) }
                    fields={{
                        name: 'isBasicRate',
                        value: 'basic'
                    }}
                    onChange={this.onChange}
            />
    </List>
    }


}


export default Orders;
