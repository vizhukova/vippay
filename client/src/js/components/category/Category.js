import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import _  from 'lodash';

class Category extends React.Component {

    constructor(){
        super();
        this.state = _.assign(CategoriesStore.getState(), {edit: false});
        this.update = this.update.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount() {
        CategoriesStore.listen(this.update);
        CategoriesAction.getAllCategories();
        console.log(this.state)
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    onEditClick() {
        this.setState({
            edit: !this.state.edit
        })
    }

    deleteCategory(e) {
        debugger
        var id = e.target.getAttribute("data");
        CategoriesAction.deleteCategory(id);
    }

    update(state){
        _.assign(this.state, state);
        this.setState({});
        console.log(this.state)
    }

    render(){
        var baseClassDel = "btn pull-right btn-xs glyphicon glyphicon-remove";
        var baseClassEdit = "btn pull-right btn-xs glyphicon glyphicon-pencil";
        var self = this;
        if(!this.state.categories) return;
        return  <div>
            <div className="row">
                <div className="col-sm-3">
                    <table className="table table-hover">
                        <tbody>
                        { this.state.categories.map(function(item, index){
                        return <tr key={index}>
                            <td><Link className="list-group-item" to={`/category/${item.id}/products`} onClick={self.onEditClick}>{item.category}</Link></td>
                            <td><Link to={`/category/${item.id}`}><button type="button" className={self.state.edit ? `${baseClassEdit} btn-warning` : `${baseClassEdit} btn-warning hidden`}></button></Link></td>
                            <td><button type="button" data={item.id} className={self.state.edit ? `${baseClassDel} btn-danger` : `${baseClassDel} btn-danger hidden`} onClick={self.deleteCategory}></button></td>
                        </tr>
                        })}
                        </tbody>
                    </table>
                    <Link to="/category/new"> <button type="button" className="btn btn-default btn-block">Добавить категорию</button></Link>
                   <button type="button" className="btn btn-default btn-block" onClick={this.onEditClick}>{this.state.edit ? "Закончить редактирование" : "Редактировать категории"}</button>
                </div>
                <div className="col-sm-9">

                    {this.props.children}
                </div>
            </div>
        </div>

    }


}


export default Category;