import React from 'react';
import StaticStore from './../stores/StatisticStore';
import StaticActions from './../actions/StatisticAction';
import List from'./../../../../common/js/List';


class StatisticItem extends React.Component {
    
    constructor() {
        super();
        this.statuses = {
            follow_link: 'Прошел по ссылке',
            start_order: 'Заказал',
            pending_order: 'Оплатил',
            complete_order: 'Завершил'
        }
    }
    
    render() {
        return <tr>
            <td>{this.props.item.customer_id}</td>
            <td>{this.props.item.partner_login}</td>
            <td><img src={this.props.item.product.image} alt="image" width="200px" height="auto"/></td>
            <td>{this.props.item.product.name}</td>
            <td>{this.statuses[this.props.item.action]}</td>
        </tr>
    }
}
class Statistics extends React.Component {

    constructor(){
        super();
        this.state = StaticStore.getState();
        this.update = this.update.bind(this);
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
        return <List
            title="Статистика"
            error={this.state.error}
            items={this.state.statistic}
            perPage={1}
            itemComponent={StatisticItem}
            thead={['Номер заказчика', 'Ник партнера', 'Товар', 'Название', 'Дейсвие']}
            />
    }

}


export default Statistics;

/*
<table className="table table-wrapper">
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
 */