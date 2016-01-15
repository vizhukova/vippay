import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class ProductsAction {

    get(order_num) {
        /*var self = this;
        ApiActions.get(`partner/products`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })*/
    }

    add(id) {
        var self = this;
        debugger
        ApiActions.post(`order`, {id: id}).then(function(data){
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
}

export default alt.createActions(ProductsAction);
