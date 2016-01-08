import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class CategoriesAction {

    getAllCategories() {
        var self = this;
        ApiActions.get('category').then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    addNewCategory(state) {
        var self = this;
        ApiActions.post('category/new', {category: state.category}).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }

    getCurrentCategory(id) {
        var self = this;
        debugger
        ApiActions.get(`category/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            self.dispatch(err);
        })
    }
}

export default alt.createActions(CategoriesAction);