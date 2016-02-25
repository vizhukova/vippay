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

    edit(partner) {
        var self = this;
        ApiActions.put(`partner`, partner).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getFee() {
        var self = this;
        ApiActions.get(`partner/fee`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    setFee(obj) {
        return new Promise((resolve, reject) => {
            var self = this;
        ApiActions.put(`partner/fee`, obj).then(function(data){
            self.dispatch(data);
            resolve(data);
        }).catch(function(err){
            //self.dispatch(err);
            debugger
            reject(err);
        })
        })
    }

}

export default alt.createActions(PartnersAction);