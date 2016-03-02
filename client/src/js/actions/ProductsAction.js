import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class ProductsAction {

    getAllProducts(id) {
        var self = this;
        ApiActions.get(`products/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            //self.dispatch(err);
        })
    }

    editProduct(product) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put(`product/${product.id}`, product).then(function(data){
            self.dispatch(data);
                resolve(data);
        }).catch(function(err){
            //self.dispatch(err);
                reject(err);
        })
        })
    }

    getCurrentProduct(id) {
        var self = this;
        ApiActions.get(`product/${id}`, id).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            //self.dispatch(err);
        })
    }

    addNewProduct(product) {
        var self = this;
        return new Promise((resolve, reject) => {
              ApiActions.post(`product`, product).then(function(data){
                    self.dispatch(data);
                    resolve(data)
                }).catch(function(err){
                    //self.dispatch(err);
                    reject(err)
                })
        })
    }

    removeProduct(id) {
        var self = this;
        ApiActions.remove(`product/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            //self.dispatch(err);
        })
    }
}

export default alt.createActions(ProductsAction);