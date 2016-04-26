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
            onCheck: CategoriesAction.GET_ALL_CATEGORIES,
            onAddNewCat: CategoriesAction.ADD_NEW_CATEGORY,
            onGetCurrentCat: CategoriesAction.GET_CURRENT_CATEGORY,
            onDeleteCat: CategoriesAction.DELETE_CATEGORY,
            onEditCategory: CategoriesAction.EDIT_CATEGORY
        });
    }

    onCheck(data){
        this.categories = data.data;
        this.currentPage = data.page;
    }

    onAddNewCat(category){
        var self = this;
        if(category instanceof Error) {
            //console.log(JSON.parse(category.message).category);
                JSON.parse(category.message).category
                .forEach(function(i){
                    //console.log(i)
                })
        } else {
            this.categories.push({category: category.category, id: category.id});
        }
        this.onResetCategory();
    }

    onEditCategory(category) {
        if(category instanceof Error) {
            //console.log(JSON.parse(category.message).category);
                JSON.parse(category.message).category
                .forEach(function(i){alert(i)})
        } else {
            var index = _.findIndex(this.categories, { 'id': category.id });
            this.categories[index] = category;
        }
        this.onResetCategory();
    }

    onGetCurrentCat(categoryObj) {
        this.category = categoryObj;
        //console.log(categoryObj)
    }

    onDeleteCat(category) {
        if(!category) return;
        this.categories = _.filter(this.categories, function(obj) {
            return obj.id != +category.id;
        })
    }

    onResetCategory(){
        this.category = {
            id: null,
            category: ''
        };
    }

}

export default alt.createStore(CategoriesStore, 'CategoriesStore');