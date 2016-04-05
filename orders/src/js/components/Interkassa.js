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
                     <input  name="ik_co_id" type="hidden" value={payments.interkassa.method.ik_co_id} />
                     <input  name="ik_pm_no" type="hidden" value={payments.interkassa.method.ik_pm_no} />
                     <input  name="ik_am" type="hidden" value={payments.interkassa.method.ik_am} />
                     <input  name="ik_cur" type="hidden" value={payments.interkassa.method.ik_cur} />
                     <input  name="ik_desc" type="hidden" value={payments.interkassa.method.ik_desc} />
                     <input  name="ik_ia_u" type="hidden" value={payments.interkassa.method.ik_ia_u} />
                     <input  name="ik_ia_m" type="hidden" value={payments.interkassa.method.ik_ia_m} />

                        <input type="submit" value="Pay" />
                </form>
                </div>
    }
}

//type="hidden"

export default Order;