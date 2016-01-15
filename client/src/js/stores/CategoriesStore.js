import alt from '../alt';
import CategoriesAction from './../actions/CategoriesAction';
var _ = require('lodash');


class CategoriesStore {

    constructor() {
        this.categories = [];
        this.category = {
            id: null,
            name: ''
        };
        this.edit = false;
        this.bindListeners({
            onCheck: CategoriesAction.GET_ALL_CATEGORIES,
            onAddNewCat: CategoriesAction.ADD_NEW_CATEGORY,
            onGetCurrentCat: CategoriesAction.GET_CURRENT_CATEGORY,
            onDeleteCat: CategoriesAction.DELETE_CATEGORY,
            onEditCategory: CategoriesAction.EDIT_CATEGORY
        });
    }

    onCheck(categories){
        this.categories = categories;
    }

    onAddNewCat(category){
        if(category instanceof Error) {
            console.log(JSON.parse(category.message).category)
                JSON.parse(category.message).category
                .forEach(function(i){alert(i)})
            return
        } else {
            this.categories.push({category: category.category, id: category.id})
        }
    }

    onEditCategory(category) {
        if(category instanceof Error) {
            console.log(JSON.parse(category.message).category)
                JSON.parse(category.message).category
                .forEach(function(i){alert(i)})
            return
        } else {
            var index = _.findIndex(this.categories, { 'id': category.id });
            this.categories[index] = category;
        }
    }

    onGetCurrentCat(categoryObj) {
        this.category = categoryObj;
        console.log(categoryObj)
    }

    onDeleteCat(category) {
        if(!category) return;
        this.categories = _.filter(this.categories, function(obj) {
            return obj.id != category.id;
        })
    }

}

export default alt.createStore(CategoriesStore, 'CategoriesStore');