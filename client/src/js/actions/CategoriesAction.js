import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class CategoriesAction {

    getAllCategories(page) {
        var self = this;
        ApiActions.get('category').then(function(data){
            self.dispatch({page: page, data: data});
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    addNewCategory(category) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.post('category', category.category).then(function(data){
            self.dispatch(data);
                resolve(data)
        }).catch(function(err){
            //self.dispatch(err);
                reject(err);
        })
        })
    }

    editCategory(category) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put('category/id', category).then(function(data){
                self.dispatch(data);
                resolve(data);
        }).catch(function(err){
            //self.dispatch(err);
                reject(err);
        })
        })
    }

    getCurrentCategory(id) {
        var self = this;
        ApiActions.get(`category/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    deleteCategory(id) {
        var self = this;
        ApiActions.remove(`category/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }
}

export default alt.createActions(CategoriesAction);