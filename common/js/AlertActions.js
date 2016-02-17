import alt from '../../client/src/js/alt';
import Promise from 'bluebird';

class AlertActions {

    set(data) {
        this.dispatch(data);
    }

    hide(id) {
        this.dispatch({id: id});
    }

    onLeave() {
        this.dispatch();
    }

    setMessage(data) {
        var self = this;
         ApiActions.put(`messages/${data.id}`, data.data).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){
                debugger
            })
    }

}

export default alt.createActions(AlertActions);