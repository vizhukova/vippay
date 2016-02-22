import alt from '../../client/src/js/alt';
import Promise from 'bluebird';
import _ from 'lodash';

class AlertActions {

    set(data, isAutoHide) {
        this.dispatch(_.assign(data, {isAutoHide: isAutoHide}));
    }

    hide(data) {
        this.dispatch({data: data});
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