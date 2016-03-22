import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class ProductsAction {

    get(basket_id) {
        var self = this;
        ApiActions.get(`basket/product/${basket_id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){

        })
    }

    edit(data) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put(`basket`, data).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                reject(data);
            });
        });
    }

}

export default alt.createActions(ProductsAction);
