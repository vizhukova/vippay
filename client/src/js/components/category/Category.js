import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoryItem from './CategoryItem';
import CategoriesAction from'./../../actions/CategoriesAction';
import List from'./../../../../../common/js/List';
import Alert from './../../../../../common/js/Alert';
import _  from 'lodash';


class Category extends React.Component {

    constructor() {
        super();
        this.state = _.assign(CategoriesStore.getState(), {edit: false});
        _.assign(this.state, {error: {}});
        this.update = this.update.bind(this);
        this.onError = this.onError.bind(this);
    }

    onError(error) {
        this.setState({error: error});
    }

    componentDidMount() {
        CategoriesStore.listen(this.update);
        CategoriesAction.getAllCategories();
    }

    componentWillReceiveProps(props){
        CategoriesAction.getAllCategories();
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    update(state) {
        _.assign(this.state, state);
        this.setState({});
    }

    updatePage(){

        //get page from search string
        this.setState({
            page: 1
        })

    }

    render() {

        return <List
            title="Категории"
            add_link="/category/new"
            error={this.state.error}
            items={this.state.categories}
            perPage={5}
            currentPage={this.state.page}
            itemCategory={CategoryItem}
        />


    }


}

/*
 <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="table-wrapper">

                        <div className="table-head">
                        <span className="title">
                            Категории
                        </span>
                            <Link to="/category/new"
                                  className="btn btn-action-big btn-default glyphicon glyphicon-plus" />
                        </div>
                        <Alert type={this.state.error.type} text={this.state.error.text} title={this.state.error.title} />
                        <table className="table table-hover">
                            <tbody>
                            { categories.map(function (item, index) {
                                return <CategoryItem id={item.id} category={item.category} key={index} onError={self.onError}/>
                            })}
                            </tbody>
                        </table>

                        <div className="table-footer">
                            { isPagination ? <div className="inner">


                                {!isFirst ? <a className="page_prev" href={`#/categories/${+this.state.currentPage - 1}`}><span></span></a>:null}

                                {pageArray.map(function(el, i){

                                    var activeClass = +self.state.currentPage === i+1 ? 'page_current':'';

                                   return  <a href={`#/categories/${i+1}`} className={`page-numbers ${activeClass}`}>{i+1}</a>
                                })}

                                { !isLast ? <a className="page_next" href={`#/categories/${+this.state.currentPage +1}`}><span></span></a>: null}
                            </div>: null}
                        </div>

                    </div>
                </div>


            </div>
        </div>
* */


export default Category;