import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';

class Category extends React.Component {

    constructor(){
        super();
        this.state = CategoriesStore.getState();
        this.update = this.update.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount() {
        CategoriesStore.listen(this.update);
        CategoriesAction.getAllCategories();
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    onEditClick() {
        this.setState({
            edit: !this.state.edit
        })
    }

    deleteCategory() {
        CategoriesAction.deleteCategory(this.props.params.id);
    }

    update(state){
        this.setState(state);
        console.log(this.state)
    }

    render(){
        var baseClass = "btn pull-right btn-xs";
        var self = this;
        if(!this.state.categories) return;
        return  <div>
            <div className="row">
                <div className="col-sm-3">
                    <table className="table table-hover">
                        <tbody>
                        { this.state.categories.map(function(item, index){
                        return <tr key={index}>
                            <td><Link className="list-group-item" to={`/category/${item.id}/products`}>{item.category}</Link></td>
                            <td> <Link to={`/category/${item.id}`}><button type="button" className={self.state.edit ? `${baseClass} btn-danger` : `${baseClass} btn-danger hidden`} onClick={self.deleteCategory}>Х</button></Link></td>
                            <td> <Link to={`/category/${item.id}`}><button type="button" className={self.state.edit ? `${baseClass} btn-warning` : `${baseClass} btn-warning hidden`}>Редакт</button></Link></td>
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