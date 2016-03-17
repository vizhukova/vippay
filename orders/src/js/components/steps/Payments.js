import React from 'react'
import {RoutingContext, Link} from 'react-router'
import OrdersStore from'./../../stores/OrdersStore'
import OrdersAction from'./../../actions/OrdersActions'
import Interkassa from'./../Interkassa'
import Yandex from'./../Yandex'
import paymentSettings from'./../../../../../common/paymentSettings'
import _ from'lodash'

class PaymentsItem extends React.Component {

    constructor() {
       super();
       this.state={};

        this.onClick = this.onClick.bind(this);
    }
    
    onClick(e) {
        this.props.onClick(this.props.item);
    }

    render() {
        return <div className={this.props.className}>
                <h4 className="boxed" onClick={this.onClick}>{ paymentSettings[this.props.item.name] }</h4>
            </div>
    }
}


class Payments extends React.Component {

    constructor() {
        super();
        this.state = _.assign(OrdersStore.getState(), {payment: {}});
        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {

        if(this.state.order.step == 'complete') {
            window.location = 'http://img.ezinearticles.com/blog/payed-invoice.jpg';
        }
        else {
            OrdersAction.getPayments(this.state.order.client_id);
            OrdersAction.getMethodYandex({order_id: this.state.order.id, method: 'yandex', client_id: this.state.order.client_id});
            OrdersAction.getMethodInterkassa({order_id: this.state.order.id, method: 'interkassa', client_id: this.state.order.client_id});
        }
        OrdersStore.listen(this.update);
    }

    componentWillUnmount() {
        OrdersStore.unlisten(this.update);
    }

    onClick() {
        OrdersAction.pay(this.state.order.id)
    }

    update(state) {
        if(state.payed) window.location = 'http://img.ezinearticles.com/blog/payed-invoice.jpg';
        this.setState(state);
    }

    onClick(payment) {
        OrdersAction.setMethod({method: payment.name, id: this.state.order.id});
        this.state.payment = payment;
        this.setState({});
    }

    render() {
        console.log('PAYMENTTTTTTT', this.state)
        return <div>
                 <div className="content-step row">
                    <div className="order-num title"><b>ID заказа: </b> {this.state.order.id}</div>
                     <div><h2>Варианты оплаты: </h2></div>

                     {this.state.payments.map((item, index) => {
                         return <PaymentsItem item={item}
                                              key={index}
                                              yandex={this.state.yandex}
                                              interkassa={this.state.interkassa}
                                              payment={this.state.payment}
                                              onClick={this.onClick}
                                              className="col-md-3"  />
                     })}
                 </div>
                {this.state.payment.name
                    ? <div className="row boxed">
                        <div className="col-md-3">
                           {this.state.payment.name == 'interkassa' ? <Interkassa method={this.state.interkassa} /> :
                                         (this.state.payment.name == 'yandex' ? <Yandex method={this.state.yandex} /> :
                                             null
                                         )
                                     }
                        </div>
                        <div className="col-md-9">
                          <div className="col-md-4 text-uppercase"><b>Описание:</b></div>
                          <div className="col-md-8">{ this.state.payment.details || paymentSettings[`${this.state.payment.name}_details`] }</div>
                        </div>
                    </div>
                    : null}
           </div>
    }
}

export default Payments;


/*
 <div className="boxed" key={index}>
                             <h3>{ paymentSettings[item.name] }</h3>
                             {item.name == 'interkassa' ? <Interkassa method={this.state.interkassa} /> :
                                 (item.name == 'yandex' ? <Yandex method={this.state.yandex} /> :
                                     null
                                 )
                             }
                             <div>
                                 <span>{ item.details || paymentSettings[`${item.name}_details`] }</span>
                             </div>
                         </div>

* */