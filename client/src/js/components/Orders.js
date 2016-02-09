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
    }
    
    render() {
        return <tr>
            <td>{this.props.item.login ? this.props.item.login : "отсутствует"}</td>
            <td><img src={this.props.item.product.image} alt="image" width="200px" height="auto"/></td>
            <td><a href={this.props.item.product.product_link} target="_blank">{this.props.item.product.name}</a></td>
            <td>{this.props.item.product.price}</td>
            <td>{this.props.item.product.currency_name}</td>
            <td>{this.statuses[this.props.item.step]}</td>
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
            perPage={2}
            itemComponent={OrderItem}
            thead={['Партнер', 'Картинка', 'Продукт', 'Цена', 'Валюта', 'Статус']}
            />
    }


}


export default Orders;

/*
return <table className="table table-wrapper">
                <thead>
                  <tr>
                    <th>Партнер</th>
                    <th>Картинка</th>
                    <th>Продукт</th>
                    <th>Цена</th>
                    <th>Валюта</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                 { this.state.orders.map(function(item, index) {
                     return <tr key={index}>
                         <td>{item.login ? item.login : "отсутствует"}</td>
                         <td><img src={item.product.image} alt="image" width="200px" height="auto"/></td>
                         <td><a href={item.product.product_link} target="_blank">{item.product.name}</a></td>
                         <td>{item.product.price}</td>
                         <td>{item.product.currency_name}</td>
                         <td>{self.statuses[item.step]}</td>
                     </tr>
                 })}
                </tbody>
              </table>

 */