import alt from '../alt';
import CategoriesAction from './../actions/CategoriesAction';

class CategoriesStore {

    constructor() {
        this.categories = [];
        this.bindListeners({
            onCheck: CategoriesAction.GET_ALL_CATEGORIES
        });
    }

    onCheck(categories){
        this.categories = categories;
    }

}

export default alt.createStore(CategoriesStore, 'CategoriesStore');