import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class StatisticAction {

    get() {
        var self = this;
        ApiActions.get('statistic').then(function(data){
            self.dispatch(data);
        }).catch(function(err){
        })
    }

}

export default alt.createActions(StatisticAction);