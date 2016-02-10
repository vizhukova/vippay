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
        console.log('Statistic render', this.props.item)
        return <tr>
            <td>{this.props.item.customer_id}</td>
            <td>{this.props.item.partner_login ? this.props.item.partner_login : '-'}</td>
            <td><a href={this.props.item.product.product_link}>{this.props.item.product.name}</a></td>
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
            itemComponent={StatisticItem}
            thead={[
                {name: 'Номер заказчика', key: 'customer_id'},
                {name: 'Ник партнера', key: 'partner_login'},
                {name: 'Товар', key: 'product.name'},//key = product.name ?
                {name: 'Дейсвие', key: 'action'}
            ]}
            />
    }

}


export default Statistics;
