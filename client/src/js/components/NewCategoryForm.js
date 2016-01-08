import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../stores/CategoriesStore';
import CategoriesAction from'./../actions/CategoriesAction';

class Category extends React.Component {

    constructor(){
        super();
        this.state = CategoriesStore.getState();
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.getCurrentCategory = this.getCurrentCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
    }

    componentDidMount() {
        debugger
        console.log(this.props.params.id)
        if(this.props.params.id) {
            this.getCurrentCategory(this.props.params.id);
        }
        CategoriesStore.listen(this.update);

       // CategoriesAction.addNewCategory(this.state);
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    getCurrentCategory(id) {
        CategoriesAction.getCurrentCategory(id);
    }

    addNewCategory() {
        if(this.state.category.length == 0) {alert('Поле "категория" обязательно для заполнения'); return;}
        CategoriesAction.addNewCategory(this.state);
    }

    editCategory() {
        if(this.state.category.length == 0) {alert('Поле "категория" обязательно для заполнения'); return;}
        if(this.state.category == this.state.currCategories) {alert('Вы не изменили категорию'); return;}
        CategoriesAction.editCategory(this.state);
    }

    onChange(e) {
        console.log(e.target.value)
        var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
    }

    update(state){
        this.setState(state);
    }

    render(){

        return  <div className="col-sm-7">
            <form>
              <fieldset className="form-group">
                <label htmlFor="newCategory" className="text-primary">Новая категория</label>
                <input type="text" name="category" className="form-control" id="newCategory" onChange={this.onChange}
                       value={this.state.edit || this.state.currCategories ? this.state.category : ""}
                       placeholder="Введите название новой категории" />
              </fieldset>
                <button type="button" className="btn btn-info pull-right" onClick={this.state.currCategories ? this.editCategory : this.addNewCategory}>{this.state.currCategories ? "Редактировать" : "Добавить"}</button>
            </form>
        </div>

    }


}


export default Category;