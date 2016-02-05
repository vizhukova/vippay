import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import Alert from './../../../../../common/js/Alert';
import _  from 'lodash';

class CategoryForm extends React.Component {

    constructor(){
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
        var self = this;
        if (!this.state.category.category || this.state.category.category.length == 0) {
            self.setState({
                error: {
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Поле "категория" обязательно для заполнения.'
                }
            })
            return;
        }

        if(this.state.category.length == 0) {alert('Поле "категория" обязательно для заполнения'); return;}
        CategoriesAction.addNewCategory(this.state).then((data) => {

            history.back();

        }).catch((err) => {
            self.setState({
                error: {
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Такая категория уже существует.'
                }
            })

        })
    }

    editCategory() {
        var self = this;
        if (this.state.category.category.length == 0) {
            self.setState({
                error: {
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Поле "категория" обязательно для заполнения.'
                }
            })
            return;
        }
        CategoriesAction.editCategory(this.state.category).then((data) => {

            history.back();

        }).catch((err) => {
            self.setState({
                error: {
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Такая категория уже существует.'
                }
            })
        })
    }

    onChange(e) {
        var state = {};
		state[e.target.name] =  e.target.value;
		_.assign(this.state.category, state);
        this.setState({});
    }

    onClick(e) {
        this.setState({
            error: {}
        })
    }

    onKeyDown(e) {
		if(e.keyCode == 13) {
            this.props.params.id  ? this.editCategory() : this.addNewCategory();
        }
	}

    update(state){
        this.setState(state);
    }

    render(){
        return  <div className="col-sm-7 form-ui table-wrapper">
            <Alert type={this.state.error.type} text={this.state.error.text} title={this.state.error.title} />
            <form className="">
              <fieldset className="form-group">

                  <label htmlFor="newCategory" className="text-primary">Новая категория</label>
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
                   this.props.params.id  ? "Редактировать" : "Добавить"}
                </button>
            </form>
        </div>

    }


}


export default CategoryForm;