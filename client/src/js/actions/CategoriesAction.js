import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class CategoriesAction {

    getAllCategories() {
        var self = this;
        debugger
        ApiActions.get('category').then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    addNewCategory(state) {
        var self = this;
        debugger
        ApiActions.put('category', {category: state.category.name}).then(function(data){
            this.getAllCategories();
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    editCategory(state) {
        var self = this;
        debugger
        console.log(state)
        ApiActions.post('category/id', {categoryObj:  state.category}).then(function(data){
            this.getAllCategories();
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getCurrentCategory(id) {
        ApiActions.get(`category/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    deleteCategory(id) {
        debugger
        ApiActions.remove(`category/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }
}

export default alt.createActions(CategoriesAction);