import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import _  from 'lodash';

class Category extends React.Component {

    constructor() {
        super();
        this.state = _.assign(CategoriesStore.getState(), {edit: false});
        this.update = this.update.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onClickCat = this.onClickCat.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount() {
        var page = 1;
        if(this.props.params.page){
            page = this.props.params.page;
        }
        CategoriesStore.listen(this.update);
        CategoriesAction.getAllCategories(page);
    }

    componentWillReceiveProps(props){
        var page = 1;
        if(props.params.page){
            page = props.params.page;
        }
        CategoriesAction.getAllCategories(page);
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    onEditClick() {
        this.setState({
            edit: !this.state.edit
        })
    }

    onClickCat() {
        if (this.state.edit) this.onEditClick();
    }

    deleteCategory(e) {
        var id = e.target.getAttribute("data");
        CategoriesAction.deleteCategory(id);
    }

    update(state) {
        _.assign(this.state, state);
        this.setState({});
    }

    render() {
        var baseClassDel = "btn pull-right btn-xs glyphicon glyphicon-remove btn-warning btn-action btn-danger";
        var baseClassEdit = "btn pull-right btn-xs glyphicon glyphicon-pencil btn-warning btn-action btn-default";
        var self = this;

        if (!this.state.categories) return;
        var categories = this.state.categories.slice((this.state.currentPage - 1) * this.state.perPage , ((this.state.currentPage - 1) * this.state.perPage + this.state.perPage));
        var pages = Math.floor(this.state.categories.length/this.state.perPage);
        var pageArray = Array.apply(null, Array(pages)).map(function () {});

        var isPagination = false;

        if(pageArray.length > 1) isPagination = true;


        var isLast = false;
        var isFirst = false;


        if(+this.state.currentPage >= (pageArray.length)){
            isLast = true;
        }
        if(+this.state.currentPage === 1){
            isFirst = true;
        }

        return <div>
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

                        <table className="table table-hover">
                            <tbody>
                            { categories.map(function (item, index) {
                                return <tr key={index}>
                                    <td><Link to={`/category/${item.id}/products`}
                                              onClick={self.onClickCat}>{item.category}</Link></td>

                                    <td className="actions">
                                        <button type="button" data={item.id} className={baseClassDel}
                                                onClick={self.deleteCategory}></button>
                                        <Link to={`/category/${item.id}`}>
                                            <button type="button" className={baseClassEdit}></button>
                                        </Link>
                                    </td>
                                </tr>
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

    }


}


export default Category;