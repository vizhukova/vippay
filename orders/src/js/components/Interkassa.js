import React from 'react'
import OrdersStore from'./../stores/OrdersStore'
import OrderActions from'./../actions/OrdersActions'

class Order extends React.Component {

    constructor() {
        super();
    }


    render() {
        return <div className="panel-default col-md-10 col-md-offset-1 form-margin">
                 <form id="payment" name="payment" method="post" action="https://sci.interkassa.com/" enctype="utf-8">
                     <input  name="ik_co_id" type="hidden" value={this.props.method.ik_co_id} />
                     <input  name="ik_pm_no" type="hidden" value={this.props.method.ik_pm_no} />
                     <input  name="ik_am" type="hidden" value={this.props.method.ik_am} />
                     <input  name="ik_cur" type="hidden" value={this.props.method.ik_cur} />
                     <input  name="ik_desc" type="hidden" value={this.props.method.ik_desc} />

                        <input type="submit" className="btn btn-danger btn-lg" value="Pay" />
                </form>
                </div>
    }
}

//type="hidden"

export default Order;