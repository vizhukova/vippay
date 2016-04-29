import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import SettingsActions from'./../../actions/SettingsAction';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import _  from 'lodash';


/**
 * Форма создания/редактирования категории
 */
class CategoryForm extends React.Component {

    constructor() {
        super();
        this.state = CategoriesStore.getState();
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.getCurrentCategory = this.getCurrentCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
    }

    componentDidMount() {
        if (this.props.params.id) {
            this.getCurrentCategory(this.props.params.id);
        } else {
            this.setState({
                category: {
                    id: null,
                    category: ''
                }
            })
        }

        CategoriesStore.listen(this.update);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id) {
            this.getCurrentCategory(nextProps.params.id);
        } else {
            this.setState({
                category: {
                    id: null,
                    category: ''
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
        var self = this;
        if (!this.state.category.category || _.trim(this.state.category.category).length == 0) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Поле "категория" обязательно для заполнения.'
            }, true);

            return;
        }

        CategoriesAction.addNewCategory(this.state).then((data) => {
            history.back();
        })
    }

    editCategory() {
        var self = this;
        if (!this.state.category.category || _.trim(this.state.category.category).length == 0) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Поле "категория" обязательно для заполнения.'
            }, true)
            return;
        }
        CategoriesAction.editCategory(this.state.category).then((data) => {
            history.back();
        })
    }

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;
        _.assign(this.state.category, state);
        this.setState({});
    }

    onClick(e) {
        AlertActions.hide();
    }

    onKeyDown(e) {
        if (e.keyCode == 13) { //если пользователь нажал на Enter
            this.props.params.id ? this.editCategory() : this.addNewCategory();
            e.preventDefault();
        }
    }

    update(state) {
        if (state.category) _.assign(this.state.category, state.category);
        _.assign(this.state, _.omit(state, ['category']));
        this.setState({});
    }

    render() {
        return <div className="col-sm-7 form-ui table-wrapper">
            <form className="">
                <fieldset className="form-group">

                    <label htmlFor="newCategory" className="text-primary">
                        {this.props.params.id ? "Редактировать категорию" : "Новая категория"}
                    </label>
                    <input type="text" name="category" className="form-control" id="newCategory"
                           placeholder="Введите название новой категории"
                           onChange={this.onChange}
                           onKeyDown={this.onKeyDown}
                           onClick={this.onClick}
                           value={this.state.category.category}
                    />

                </fieldset>
                <button type="button" className="btn btn-default btn-submit pull-right"
                        onClick={this.props.params.id  ? this.editCategory : this.addNewCategory}>{
                    this.props.params.id ? "Редактировать" : "Добавить"}
                </button>
            </form>
        </div>

    }


}


export default CategoryForm;