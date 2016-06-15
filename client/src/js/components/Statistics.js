import React from 'react';
import StaticStore from './../stores/StatisticStore';
import StaticActions from './../actions/StatisticAction';
import List from'./../../../../common/js/List';


/**
 * Компонент отображения статистики
 */
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
        //console.log(state)
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
                                    <td>Общий долг по партнерам:</td>
                                    <td>{this.state.statistic.sum_fee_added ? parseFloat(this.state.statistic.sum_fee_added).toFixed(2) : 0}</td>
                                </tr>
                                <tr>
                                    <td>Общая сумма выплат партнерам:</td>
                                    <td>{this.state.statistic.sum_fee_payed ? parseFloat(this.state.statistic.sum_fee_payed).toFixed(2) : 0}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="table-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}


export default Statistics;
