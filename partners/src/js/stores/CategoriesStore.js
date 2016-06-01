import alt from '../alt';
import CategoriesAction from './../actions/CategoriesAction';
var _ = require('lodash');


class CategoriesStore {

    constructor() {
        this.categories = [];
        this.category = {
            category: ''
        };
        this.currentPage = 1;
        this.perPage = 5;

        this.bindListeners({
            onAllCategories: CategoriesAction.GET_ALL_CATEGORIES,
            onGetCurrentCat: CategoriesAction.GET_CURRENT_CATEGORY
        });
    }

    onAllCategories(data){
        this.categories = data.data;
        this.currentPage = data.page;
    }

    onGetCurrentCat(categoryObj) {
        this.category = categoryObj;
        //console.log(categoryObj)
    }
}

export default alt.createStore(CategoriesStore, 'CategoriesStore');