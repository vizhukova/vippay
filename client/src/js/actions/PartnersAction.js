import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class PartnersAction {

    getAll() {
        var self = this;
        ApiActions.get(`partners`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

}

export default alt.createActions(PartnersAction);