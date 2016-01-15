import React from 'react';
import OrdersActions from'./../actions/OrdersAction';
import OrdersStore from'./../stores/OrdersStore';


class Orders extends React.Component {

    constructor(){
        super();
        this.state = OrdersStore.getState();this.statuses = {
            pending: 'Заказ оформлен',
            complete: 'Заказ оплачен',
            leaving: 'Заказ завершен'
        }
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
        return <table className="table">
                <thead>
                  <tr>
                    <th>Партнер</th>
                    <th>Картинка</th>
                    <th>Продукт</th>
                    <th>Цена</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                 { this.state.orders.map(function(item, index) {
                     return <tr key={index}>
                         <td>{item.login}</td>
                         <td><img src={item.product.image} alt="image" width="200px" height="auto"/></td>
                         <td><a href={item.product.product_link} target="_blank">{item.product.name}</a></td>
                         <td>{item.product.price}</td>
                         <td>{self.statuses[item.step]}</td>
                     </tr>
                 })}
                </tbody>
              </table>

    }


}


export default Orders;