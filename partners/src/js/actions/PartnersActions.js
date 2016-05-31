import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class PartnersAction {

    getById(id) {
        var self = this;
        ApiActions.get(`partner_secondary/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }
}

export default alt.createActions(PartnersAction);
