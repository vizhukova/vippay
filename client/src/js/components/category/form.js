import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import _  from 'lodash';

class CategoryForm extends React.Component {

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
        if(this.props.params.id) {
            this.getCurrentCategory(this.props.params.id);
        }

        CategoriesStore.listen(this.update);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.id) {
            this.getCurrentCategory(nextProps.params.id);
        } else {
            this.setState({
                category: {
                    id: null,
                    name: ''
                }
            })
        }
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
        history.back();
    }

    editCategory() {
        if(this.state.category.length == 0) {alert('Поле "категория" обязательно для заполнения'); return;}
        CategoriesAction.editCategory(this.state.category);
        history.back();
    }

    onChange(e) {
        var state = {};
		state[e.target.name] =  e.target.value;
		_.assign(this.state.category, state);
        this.setState({});
    }

    update(state){
        this.setState(state);
    }

    render(){
        return  <div className="col-sm-7 form-ui">
            <form className="">
              <fieldset className="form-group">
                <label htmlFor="newCategory" className="text-primary">Новая категория</label>
                <input type="text" name="category" className="form-control" id="newCategory" onChange={this.onChange}
                       value={this.state.category.category}
                       placeholder="Введите название новой категории" />
              </fieldset>
                <button type="button" className="btn btn-default"
                        onClick={this.props.params.id  ? this.editCategory : this.addNewCategory}>{
                   this.props.params.id  ? "Редактировать" : "Добавить"}
                </button>
            </form>
        </div>

    }


}


export default CategoryForm;