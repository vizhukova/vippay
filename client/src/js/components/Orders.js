import React from 'react';
import OrdersActions from'./../actions/OrdersAction';
import OrdersStore from'./../stores/OrdersStore';
import List from'./../../../../common/js/List';


class OrderItem extends React.Component {
    
    constructor() {
        super();

         this.statuses = {
            pending: 'Заказ оформлен',
            complete: 'Заказ оплачен',
            leaving: 'Заказ завершен'
        }

        this.setComplete = this.setComplete.bind(this);
    }

    setComplete() {
        if(this.props.item.step == 'complete')OrdersActions.setComplete({step: 'pending', id:this.props.item.id});
        else OrdersActions.setComplete({step: 'complete', id:this.props.item.id});
    }
    
    render() {
        var complete = "glyphicon glyphicon-ok-circle";
        var notComplete = "glyphicon glyphicon-ban-circle";

        return <tr>
            <td>{this.props.item.login ? this.props.item.login : "-"}</td>
            <td><a href={this.props.item.product.product_link} target="_blank">{this.props.item.product.name}</a></td>
            <td>{this.props.item.product.price}</td>
            <td>{this.props.item.product.currency_name}</td>
            <td>{this.statuses[this.props.item.step]}</td>
            <td><button type="button" className={`btn btn-default btn-action ${this.props.item.step == 'complete' ? complete : notComplete}`} onClick={this.setComplete}></button></td>
        </tr>
    }
    
}
    
    
class Orders extends React.Component {

    constructor(){
        super();
        this.state = OrdersStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        OrdersStore.listen(this.update);
        OrdersActions.get();
    }

    componentWillUnmount() {
        OrdersStore.unlisten(this.update);
    }

    update(state) {
        console.log(state)
        this.setState(state);
    }



    render(){
        var self = this;
        
        return <List
            title="Заказы"
            error={this.state.error}
            items={this.state.orders}
            itemComponent={OrderItem}
            thead={['Партнер', 'Продукт', 'Цена', 'Валюта', 'Статус', 'Оплачен']}
            />
    }


}


export default Orders;
