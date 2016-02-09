import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class OrdersAction {

    get() {
        var self = this;
        ApiActions.get(`orders`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    setComplete(data) {
        var self = this;
        ApiActions.put(`order/${data.id}`, {step: data.step}).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

}

export default alt.createActions(OrdersAction);