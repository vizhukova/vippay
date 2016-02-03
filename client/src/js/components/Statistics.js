import React from 'react';
import StaticStore from './../stores/StatisticStore';
import StaticActions from './../actions/StatisticAction';

class Statistics extends React.Component {

    constructor(){
        super();
        this.state = StaticStore.getState();
        this.update = this.update.bind(this);
        this.statuses = {
            follow_link: 'Прошел по ссылке',
            start_order: 'Заказал',
            pending_order: 'Оплатил',
            complete_order: 'Завершил'
        }
    }

    componentDidMount() {
        StaticStore.listen(this.update);
        StaticActions.get();
    }

    componentWillUnmount() {
        StaticStore.unlisten(this.update);
    }

    update(state) {
        console.log(state)
        this.setState(state)
    }

    render(){
        var self = this;
        return <table className="table table-wrapper">
                <thead>
                  <tr>
                    <th>Номер заказчика</th>
                    <th>Ник партнера</th>
                    <th>Товар</th>
                    <th>Название</th>
                    <th>Дейсвие</th>
                  </tr>
                </thead>
                <tbody>
                    { this.state.statistic.map(function(item, index) {
                     return <tr key={index}>
                         <td>{item.customer_id}</td>
                         <td>{item.partner_login}</td>
                         <td><img src={item.product.image} alt="image" width="200px" height="auto"/></td>
                         <td>{item.product.name}</td>
                         <td>{self.statuses[item.action]}</td>
                     </tr>
                 })}
                </tbody>
              </table>

    }

}


export default Statistics;