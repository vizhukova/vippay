import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class SettingsAction {

    get() {
        var self = this;
        ApiActions.get('settings').then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

}

export default alt.createActions(SettingsAction);