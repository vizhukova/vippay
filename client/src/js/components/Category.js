import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../stores/CategoriesStore';
import CategoriesAction from'./../actions/CategoriesAction';

class Category extends React.Component {

    constructor(){
        super();
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

    update(state){
        debugger
        console.log(state.categories)
        /*this.state.categories.map(function(item, index){
            console.log(item.category)
        }*/
        //this.setState(state);
    }

    render(){

        return  <div>
            <div className="row">
                <div className="col-sm-3">
                    <ul className="nav nav-pills nav-stacked">
                        { this.state.categories.map(function(item, index){
                        return <li key={index}><Link className="list-group-item" to="/category/1">{item.category}</Link></li>
                        })}
                    </ul>
                    <Link to="/category/new"> <button type="button" className="btn btn-default btn-block">Добавить категорию</button></Link>
                </div>
                <div className="col-sm-9">

                    {this.props.children}
                </div>
            </div>
        </div>

    }


}


export default Category;