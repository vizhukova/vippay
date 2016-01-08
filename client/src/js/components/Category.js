import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../stores/CategoriesStore';
import CategoriesAction from'./../actions/CategoriesAction';

class Category extends React.Component {

    constructor(){
        super();
        debugger
        this.state = CategoriesStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        CategoriesStore.listen(this.update);
        CategoriesAction.getAllCategories();
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    editCategories() {
        this.setState({
            edit: !this.state.edit
        })
    }

    update(state){
        console.log(state.categories)
        this.setState(state);
    }

    render(){
        var baseClass = "btn pull-right btn-xs";
        var self = this;
        console.log(this.state)
        if(!this.state.categories) return;
        return  <div>
            <div className="row">
                <div className="col-sm-3">
                    <ul className="nav nav-pills nav-stacked">
                        { this.state.categories.map(function(item, index){
                        return <li key={index}><Link className="list-group-item" /*to={`/category/${item.id}`}*/>{item.category}
                        </Link>
                            <button type="button" className={self.state.edit ? `${baseClass} btn-danger` : `${baseClass} btn-danger hidden`}>Х</button>
                            <Link to={`/category/${item.id}/edit`}>
                                <button type="button" className={self.state.edit ? `${baseClass} btn-warning` : `${baseClass} btn-warning hidden`}>Редакт</button>
                            </Link>
                        </li>
                        })}
                    </ul>
                    <Link to="/category/new"> <button type="button" className="btn btn-default btn-block">Добавить категорию</button></Link>
                   <button type="button" className="btn btn-default btn-block" >Редактировать категории</button>
                </div>
                <div className="col-sm-9">

                    {this.props.children}
                </div>
            </div>
        </div>

    }


}


export default Category;