import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class ProductsAction {

    get(order_num) {
        var self = this;
        ApiActions.get(`order/${ order_num}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){

        })
    }

    add(data) {
        var self = this;
        ApiActions.post(`order`, data).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getProduct(id) {
        var self = this;
        ApiActions.get(`product/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    pay(id) {
        var self = this;
        ApiActions.put(`order`, {id: id}).then(function(data){
            self.dispatch(data);
        }).catch(function(err){

        })
    }

    getMethod(data) {
        var self = this;
        ApiActions.get(`payments/data/${data.order_id}/${data.method}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){

        })
    }

    getUpsells(id) {
        var self = this;
        return new Promise((resolve,reject) => {
           ApiActions.get(`product/upsells/${id}`).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        });
    }
}

export default alt.createActions(ProductsAction);
