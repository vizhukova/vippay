import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class ProductsAction {

    getAllProducts(category_id) {
        var self = this;
        ApiActions.get(`products/${category_id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
        })
    }

    get() {
        var self = this;
        ApiActions.get(`product`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
        })
    }



    editProduct(product) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put(`product/${product.id}`, product).then(function(data){
            self.dispatch(data);
                resolve(data);
        }).catch(function(err){
                reject(err);
        })
        })
    }

    getCurrentProduct(id) {
        var self = this;
       return new Promise((resolve, reject) => {
            ApiActions.get(`product/${id}`, id).then(function(data){
            resolve(data);
            self.dispatch(data);
        }).catch(function(err){
            reject(err);
        })
       })
    }

    addNewProduct(product) {
        var self = this;
        return new Promise((resolve, reject) => {
              ApiActions.post(`product`, product).then(function(data){
                    self.dispatch(data);
                    resolve(data)
                }).catch(function(err){
                    reject(err)
                })
        })
    }

    removeProduct(id) {
        var self = this;
        ApiActions.remove(`product/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
        })
    }

    getProductsForUpsell() {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.get(`product`).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })

    }

    getUpsellsProducts(id) {
        var self = this;
        ApiActions.get(`product/upsell/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
        })

    }

    clear(data) {
        this.dispatch(data);
    }

    setStateProduct(product) {
        this.dispatch(product);
    }
}

export default alt.createActions(ProductsAction);