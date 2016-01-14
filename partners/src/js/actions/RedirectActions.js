import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class RedirectAction {

    redirect(data) {
        var self = this;
        ApiActions.post(`redirect`, data).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }
}

export default alt.createActions(RedirectAction);
