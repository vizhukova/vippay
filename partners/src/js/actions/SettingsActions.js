import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class SettingsAction {

    get() {
        var self = this;
        ApiActions.get(`settings/partner`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getClients() {
        var self = this;
        ApiActions.get(`clients`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getCurrentPartner() {
        var self = this;
        ApiActions.get(`partner/current`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getCurrentClient() {
        var self = this;
        ApiActions.get(`client`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getStatistic() {
        var self = this;
        ApiActions.get(`partner/statistic`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    setNewPassword(data) {
        return new Promise((resolve, reject) => {
            ApiActions.put(`user/password`, data).then(function(result){

                resolve(result);
            }).catch(function(err){

                reject(err);
            })
        })
    }

   editPayment(data) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put(`partner/payments`, data).then(function(result){
                self.dispatch(result);
                resolve(result);
            }).catch(function(err){
        })
        })
    }
}

export default alt.createActions(SettingsAction);
