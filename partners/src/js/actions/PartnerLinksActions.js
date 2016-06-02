import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class PartnerLinksAction {

    get() {
        var self = this;
        ApiActions.get(`partner/partnerlinks`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }
}

export default alt.createActions(PartnerLinksAction);
