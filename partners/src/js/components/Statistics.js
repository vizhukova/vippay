import React from 'react';
import SettingsStore from './../stores/SettingsStore';
import SettingsActions from './../actions/SettingsActions';
import List from'./../../../../common/js/List';


/**
 * Элемент статистики партнера
 */
class StatisticItem extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {

        return <tr>
            <td>{this.props.item.login}</td>
            <td>{this.props.item.email}</td>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.count_pending_order || 0}</td>
            <td>{this.props.item.count_complete_order || 0}</td>
            <td>{this.props.item.sum_pending_order && parseFloat(this.props.item.sum_pending_order).toFixed(2) ? parseFloat(this.props.item.sum_pending_order).toFixed(2) : '0.00'}</td>
            <td>{this.props.item.sum_complete_order && parseFloat(this.props.item.sum_complete_order).toFixed(2) ? parseFloat(this.props.item.sum_complete_order).toFixed(2) : '0.00'}</td>
            <td>{this.props.item.sum_fee_added && parseFloat(this.props.item.sum_fee_added).toFixed(2) ? parseFloat(this.props.item.sum_fee_added).toFixed(2) : '0.00'}</td>
        </tr>
    }
}

/**
 * Статиситка партнёра
 */
class Statistics extends React.Component {

    constructor(){
        super();
        this.state = SettingsStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        SettingsStore.listen(this.update);
        SettingsActions.getStatistic();
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update);
    }

    update(state) {
        console.log(state)
        this.setState(state)
    }

    render(){
        var self = this;
        return <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="table-wrapper">
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <td>Количество пользователей, прошедших по ссылке:</td>
                                    <td>{this.state.statistic.count_follow_link || 0}</td>
                                </tr>
                                <tr>
                                    <td>Количество пользователей, оформивших заказ:</td>
                                    <td>{this.state.statistic.count_start_order || 0}</td>
                                </tr>
                                 <tr>
                                    <td>Количество пользователей, оплативших заказ:</td>
                                    <td>{this.state.statistic.count_pending_order || 0}</td>
                                </tr>                            
                                <tr>
                                    <td>Общая сумма оформленных заказов:</td>
                                    <td>{this.state.statistic.sum_pending_order || 0}</td>
                                </tr>
                                <tr>
                                    <td>Общая сумма оплаченых заказов:</td>
                                    <td>{this.state.statistic.sum_complete_order || 0}</td>
                                </tr>
                                <tr>
                                    <td>Общая сумма клиентского долга :</td>
                                    <td>{this.state.statistic.sum_fee_added || '0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Общая сумма клиентских выплат:</td>
                                    <td>{this.state.statistic.sum_fee_payed || '0.00'}</td>
                                </tr>
                                <tr>
                                    <td>Количество оплаченных заказов партнеров второго уровня:</td>
                                    <td>{this.state.statistic.count_complete_order_partners_secondary ? this.state.statistic.count_complete_order_partners_secondary : 0}</td>
                                </tr>
                                <tr>
                                    <td>Общая сумма, начисленная за заказы партнеров второго уровня:</td>
                                    <td>{this.state.statistic.sum_complete_order_partners_secondary ? parseFloat(this.state.statistic.sum_complete_order_partners_secondary).toFixed(2) : '0.00'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <List
                    title="Партнеры второго уровня"
                    items={this.state.statistic.partners_secondary}
                    itemComponent={StatisticItem}
                    isPaginate={true}
                    thead={[
                        {name: 'Логин', key: 'login'},
                        {name: 'Эл. почта', key: 'email'},
                        {name: 'ФИО', key: 'name'},
                        {name: 'Кол-во оформленных заказов', key: 'count_pending_order'},
                        {name: 'Кол-во оплаченых заказов', key: 'count_complete_order'},
                        {name: 'Общая сумма оформленных заказов', key: 'sum_pending_order'},
                        {name: 'Общая сумма оплаченых заказов', key: 'sum_complete_order'},
                        {name: 'Сумма клиентских выплат', key: 'sum_fee_added'}
                    ]}
                    />

            </div>
             <div className="table-footer"></div>
        </div>
    }

}


export default Statistics;
