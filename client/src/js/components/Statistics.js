import React from 'react';
import StaticStore from './../stores/StatisticStore';
import StaticActions from './../actions/StatisticAction';

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

        return <table className="table">
                <thead>
                  <tr>
                    <th>customer_id</th>
                    <th>partner_id</th>
                    <th>client_id</th>
                    <th>product_id</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                    { this.state.statistic.map(function(item, index) {
                     return <tr key={index}>
                         <td>{item.customer_id}</td>
                         <td>{item.partner_id}</td>
                         <td>{item.client_id}</td>
                         <td>{item.product_id}</td>
                         <td>{item.action}</td>
                     </tr>
                 })}
                </tbody>
              </table>

    }

}


export default Statistics;