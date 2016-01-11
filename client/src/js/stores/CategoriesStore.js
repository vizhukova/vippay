import alt from '../alt';
import CategoriesAction from './../actions/CategoriesAction';

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
            onDeleteCat: CategoriesAction.DELETE_CATEGORY
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
        }
    }

    onGetCurrentCat(categoryObj) {
        debugger
        this.category = categoryObj;
        console.log(categoryObj)
    }

    onDeleteCat() {

    }

}

export default alt.createStore(CategoriesStore, 'CategoriesStore');