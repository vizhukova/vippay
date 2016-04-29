import React from 'react';
import SettingsStore from './../stores/SettingsStore';
import SettingsActions from './../actions/SettingsActions';
import List from'./../../../../common/js/List';

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
                                    <td>{this.state.statistic.sum_fee_added || 0}</td>
                                </tr>
                                <tr>
                                    <td>Общая сумма клиентских выплат:</td>
                                    <td>{this.state.statistic.sum_fee_payed || 0}</td>
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
