import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class CategoriesAction {

    getAllCategories(page) {
        var self = this;
        ApiActions.get('category').then(function(data){
            self.dispatch({page: page, data: data});
        }).catch(function(err){
        })
    }

    getCurrentCategory(id) {
        var self = this;
        ApiActions.get(`category/${id}`).then(function(data){
            self.dispatch(data);
        }).catch(function(err){
        })
    }
}

export default alt.createActions(CategoriesAction);