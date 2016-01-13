import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class ProductsAction {

    getAll() {
        var self = this;
        ApiActions.get(`partner/products`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }
}

export default alt.createActions(ProductsAction);
