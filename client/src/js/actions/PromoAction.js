import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class PromoAction {

    get() {
        var self = this;
        ApiActions.get('promo').then(function(res){
            self.dispatch(res);
        }).catch(function(err){
            //self.dispatch(err);
        })
    }

    add(data) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.post('promo', data).then(function(res){
            self.dispatch(res);
                resolve(res)
        }).catch(function(err){
            //self.dispatch(err);
                reject(err);
        })
        })
    }

    edit(data) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put('category', data).then(function(res){
                self.dispatch(res);
                resolve(res);
        }).catch(function(err){
            //self.dispatch(err);
                reject(err);
        })
        })
    }

    getById(id) {
        var self = this;
        ApiActions.get(`promo/${id}`).then(function(res){
            self.dispatch(res);
        }).catch(function(err){
            //self.dispatch(err);
        })
    }

    delete(id) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.remove(`category/${id}`).then(function(res){
            self.dispatch(res);
                resolve(res);
            }).catch(function(err){
                //self.dispatch(err);
                reject(err);
            })
        })
    }
}

export default alt.createActions(PromoAction);