import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class SettingsAction {

    get() {
        var self = this;
        ApiActions.get('settings').then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            //self.dispatch(err);
        })
    }

    getAllCurrencies() {

        var self = this;
        new Promise((resolve, reject) => {
            ApiActions.get(`currency`).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                //self.dispatch(err);
                reject(err);
            })
        })
    }

    setBasicCurrency(id) {
         this.dispatch(id);
    }

    addRate(rate) {
        debugger
        var self = this;
            ApiActions.put(`rate`, rate).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
                self.dispatch(err);
        })
    }
}

export default alt.createActions(SettingsAction);